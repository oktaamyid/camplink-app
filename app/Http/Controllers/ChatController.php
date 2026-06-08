<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\TeamRecruitment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChatController extends Controller
{
    /**
     * Display the chat list and specific conversation if ID provided.
     */
    public function index(Request $request, ?int $id = null): Response
    {
        $user = $request->user();

        // Fetch team conversations where user is a member
        // User is member if they created the activity OR if they have an accepted application
        $teamRecruitments = TeamRecruitment::whereHas('activity', function ($q) use ($user) {
            $q->where('creator_id', $user->id);
        })
            ->orWhereHas('applications', function ($q) use ($user) {
                $q->where('applicant_id', $user->id)->where('status', 'accepted');
            })
            ->with(['activity:id,title'])
            ->get();

        $conversations = [];

        foreach ($teamRecruitments as $team) {
            $conversation = Conversation::firstOrCreate(
                ['team_recruitment_id' => $team->id]
            );

            $lastMessage = $conversation->messages()->latest()->first();

            $conversations[] = [
                'id' => $conversation->id,
                'team_id' => $team->id,
                'title' => $team->activity->title,
                'last_message' => $lastMessage ? $lastMessage->body : 'Belum ada pesan',
                'updated_at' => $lastMessage ? $lastMessage->created_at : $conversation->created_at,
                'type' => 'team',
            ];
        }

        $activeConversation = null;
        $messages = [];

        if ($id) {
            $activeConversation = Conversation::with(['teamRecruitment.activity'])->find($id);

            if ($activeConversation) {
                // Security check: Is user member of this team?
                $isMember = $teamRecruitments->contains('id', $activeConversation->team_recruitment_id);

                if (! $isMember) {
                    abort(403);
                }

                $messages = Message::with('sender:id,name')
                    ->where('conversation_id', $id)
                    ->oldest()
                    ->get();
            }
        }

        return Inertia::render('pesan/index', [
            'conversations' => $conversations,
            'activeConversation' => $activeConversation,
            'messages' => $messages,
        ]);
    }

    /**
     * Send a new message.
     */
    public function store(Request $request, Conversation $conversation)
    {
        $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $user = $request->user();

        // Security check: Is user member?
        $isMember = TeamRecruitment::where('id', $conversation->team_recruitment_id)
            ->where(function ($query) use ($user) {
                $query->whereHas('activity', function ($q) use ($user) {
                    $q->where('creator_id', $user->id);
                })
                    ->orWhereHas('applications', function ($q) use ($user) {
                        $q->where('applicant_id', $user->id)->where('status', 'accepted');
                    });
            })
            ->exists();

        if (! $isMember) {
            abort(403);
        }

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $user->id,
            'body' => $request->body,
        ]);

        return back();
    }
}
