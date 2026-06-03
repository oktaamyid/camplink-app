<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $activeConversationId = $request->query('conversation_id');

        $conversations = Conversation::with(['userOne', 'userTwo', 'messages' => function ($q) {
            $q->latest()->take(1);
        }])
        ->where('user_one_id', $user->id)
        ->orWhere('user_two_id', $user->id)
        ->get()
        ->map(function ($conv) use ($user) {
            $otherUser = $conv->user_one_id === $user->id ? $conv->userTwo : $conv->userOne;
            $lastMessage = $conv->messages->first();
            return [
                'id' => $conv->id,
                'other_user' => [
                    'id' => $otherUser->id,
                    'name' => $otherUser->name,
                ],
                'last_message' => $lastMessage ? $lastMessage->body : 'Belum ada pesan.',
                'last_message_time' => $lastMessage ? $lastMessage->created_at->diffForHumans() : '',
                'unread_count' => $conv->messages()->where('sender_id', '!=', $user->id)->where('is_read', false)->count(),
            ];
        });

        $activeConversation = null;
        $messages = [];

        if ($activeConversationId) {
            $conversation = Conversation::where(function($q) use ($user) {
                $q->where('user_one_id', $user->id)->orWhere('user_two_id', $user->id);
            })->findOrFail($activeConversationId);

            $otherUser = $conversation->user_one_id === $user->id ? $conversation->userTwo : $conversation->userOne;
            $activeConversation = [
                'id' => $conversation->id,
                'other_user' => [
                    'id' => $otherUser->id,
                    'name' => $otherUser->name,
                ],
            ];

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
            'body' => 'required|string',
        ]);

        $conversation = Conversation::where(function($q) use ($request) {
            $q->where('user_one_id', $request->user()->id)->orWhere('user_two_id', $request->user()->id);
        })->findOrFail($validated['conversation_id']);

        $conversation->messages()->create([
            'sender_id' => $request->user()->id,
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
        
        $conversation = Conversation::where(function($q) use ($userId, $otherUserId) {
            $q->where('user_one_id', $userId)->where('user_two_id', $otherUserId);
        })->orWhere(function($q) use ($userId, $otherUserId) {
            $q->where('user_one_id', $otherUserId)->where('user_two_id', $userId);
        })->first();
        
        if (!$conversation) {
            $conversation = Conversation::create([
                'user_one_id' => $userId,
                'user_two_id' => $otherUserId,
            ]);
        }
        
        return redirect()->route('pesan.index', ['conversation_id' => $conversation->id]);
    }
}
