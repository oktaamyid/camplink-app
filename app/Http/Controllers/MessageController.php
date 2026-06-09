<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\TeamRecruitment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $activeConversationId = $request->query('conversation_id');
        $teamRecruitmentId = $request->query('team_recruitment_id');

        if ($teamRecruitmentId) {
            $teamConv = Conversation::firstOrCreate(
                ['team_recruitment_id' => $teamRecruitmentId]
            );
            $activeConversationId = $teamConv->id;
        }

        // 1. Fetch 1-on-1 conversations
        $directConversations = Conversation::with(['userOne', 'userTwo', 'messages' => function ($q) {
            $q->latest()->take(1);
        }])
            ->where('team_recruitment_id', null)
            ->where(function ($q) use ($user) {
                $q->where('user_one_id', $user->id)->orWhere('user_two_id', $user->id);
            })
            ->get()
            ->map(function ($conv) use ($user) {
                $otherUser = $conv->user_one_id === $user->id ? $conv->userTwo : $conv->userOne;
                $lastMessage = $conv->messages->first();

                return [
                    'id' => $conv->id,
                    'title' => $otherUser->name,
                    'type' => 'direct',
                    'last_message' => $lastMessage ? $lastMessage->body : 'Belum ada pesan.',
                    'last_message_time' => $lastMessage ? $lastMessage->created_at->diffForHumans() : '',
                    'unread_count' => $conv->messages()->where('sender_id', '!=', $user->id)->where('is_read', false)->count(),
                ];
            });

        // 2. Fetch Team conversations
        $teamRecruitments = TeamRecruitment::whereHas('activity', function ($q) use ($user) {
            $q->where('creator_id', $user->id);
        })
            ->orWhereHas('applications', function ($q) use ($user) {
                $q->where('applicant_id', $user->id)->where('status', 'accepted');
            })
            ->with(['activity:id,title'])
            ->get();

        $teamConversations = $teamRecruitments->map(function ($team) use ($user) {
            $conversation = Conversation::firstOrCreate(
                ['team_recruitment_id' => $team->id]
            );

            $lastMessage = $conversation->messages()->latest()->first();

            return [
                'id' => $conversation->id,
                'title' => $team->activity->title,
                'type' => 'team',
                'last_message' => $lastMessage ? $lastMessage->body : 'Belum ada pesan.',
                'last_message_time' => $lastMessage ? $lastMessage->created_at->diffForHumans() : '',
                'unread_count' => $conversation->messages()->where('sender_id', '!=', $user->id)->where('is_read', false)->count(),
            ];
        });

        $conversations = $directConversations->concat($teamConversations)->sortByDesc('last_message_time')->values();

        $activeConversation = null;
        $messages = [];

        if ($activeConversationId) {
            $conversation = Conversation::with(['teamRecruitment.activity', 'userOne', 'userTwo'])->findOrFail($activeConversationId);

            // Security check
            $isAuthorized = false;
            if ($conversation->team_recruitment_id) {
                $isAuthorized = $teamRecruitments->contains('id', $conversation->team_recruitment_id);
            } else {
                $isAuthorized = ($conversation->user_one_id === $user->id || $conversation->user_two_id === $user->id);
            }

            if (! $isAuthorized) {
                abort(403);
            }

            if ($conversation->team_recruitment_id) {
                $activeConversation = [
                    'id' => $conversation->id,
                    'title' => $conversation->teamRecruitment->activity->title,
                    'type' => 'team',
                ];
            } else {
                $otherUser = $conversation->user_one_id === $user->id ? $conversation->userTwo : $conversation->userOne;
                $activeConversation = [
                    'id' => $conversation->id,
                    'title' => $otherUser->name,
                    'type' => 'direct',
                    'other_user_id' => $otherUser->id,
                ];
            }

            $messages = $conversation->messages()->with('sender:id,name')->oldest()->get();

            // Mark as read
            $conversation->messages()->where('sender_id', '!=', $user->id)->where('is_read', false)->update(['is_read' => true]);
        }

        return Inertia::render('pesan/index', [
            'conversations' => $conversations,
            'activeConversation' => $activeConversation,
            'messages' => $messages,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'body' => 'required|string|max:1000',
        ]);

        $user = $request->user();
        $conversation = Conversation::findOrFail($validated['conversation_id']);

        // Security check
        $isAuthorized = false;
        if ($conversation->team_recruitment_id) {
            $isAuthorized = TeamRecruitment::where('id', $conversation->team_recruitment_id)
                ->where(function ($query) use ($user) {
                    $query->whereHas('activity', function ($q) use ($user) {
                        $q->where('creator_id', $user->id);
                    })
                        ->orWhereHas('applications', function ($q) use ($user) {
                            $q->where('applicant_id', $user->id)->where('status', 'accepted');
                        });
                })
                ->exists();
        } else {
            $isAuthorized = ($conversation->user_one_id === $user->id || $conversation->user_two_id === $user->id);
        }

        if (! $isAuthorized) {
            abort(403);
        }

        $conversation->messages()->create([
            'sender_id' => $user->id,
            'body' => $validated['body'],
        ]);

        return back();
    }

    public function start(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|not_in:'.$request->user()->id,
        ]);

        $userId = $request->user()->id;
        $otherUserId = $validated['user_id'];

        $conversation = Conversation::where('team_recruitment_id', null)
            ->where(function ($q) use ($userId, $otherUserId) {
                $q->where('user_one_id', $userId)->where('user_two_id', $otherUserId);
            })->orWhere(function ($q) use ($userId, $otherUserId) {
                $q->where('user_one_id', $otherUserId)->where('user_two_id', $userId);
            })->first();

        if (! $conversation) {
            $conversation = Conversation::create([
                'user_one_id' => $userId,
                'user_two_id' => $otherUserId,
            ]);
        }

        return redirect()->route('pesan.index', ['conversation_id' => $conversation->id]);
    }

    /**
     * Search users for a new conversation.
     */
    public function searchUsers(Request $request)
    {
        $query = $request->query('q');
        $user = $request->user();

        if (empty($query) || strlen($query) < 2) {
            return response()->json([]);
        }

        $usersQuery = User::where('id', '!=', $user->id)
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('username', 'like', "%{$query}%");
            });

        // Non-admins cannot find admins via search
        if (! $user->isAdmin()) {
            $usersQuery->where('role', '!=', 'admin');
        }

        $users = $usersQuery->take(10)->get(['id', 'name', 'username']);

        return response()->json($users);
    }
}
