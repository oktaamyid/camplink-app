<?php

namespace App\Http\Middleware;

use App\Models\Conversation;
use App\Models\InisiatorRequest;
use App\Models\Message;
use App\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user() ? array_merge($request->user()->toArray(), [
                    'notifications' => $request->user()->unreadNotifications()->take(5)->get(),
                    'unread_notifications_count' => $request->user()->unreadNotifications()->count(),
                    'unread_messages_count' => $this->getUnreadMessagesCount($request->user()),
                    'pending_inisiators_count' => $request->user()->isAdmin()
                        ? InisiatorRequest::where('status', 'pending')->count()
                        : 0,
                    'inisiator_request' => $request->user()->inisiatorRequest,
                ]) : null,
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    /**
     * Get the count of unread chat messages for the given user.
     */
    private function getUnreadMessagesCount(User $user): int
    {
        $userConversationIds = Conversation::query()
            ->where(function ($q) use ($user) {
                $q->whereNull('team_recruitment_id')
                    ->where(function ($sub) use ($user) {
                        $sub->where('user_one_id', $user->id)->orWhere('user_two_id', $user->id);
                    });
            })
            ->orWhere(function ($q) use ($user) {
                $q->whereNotNull('team_recruitment_id')
                    ->whereHas('teamRecruitment', function ($sub) use ($user) {
                        $sub->whereHas('activity', function ($act) use ($user) {
                            $act->where('creator_id', $user->id);
                        })
                            ->orWhereHas('applications', function ($app) use ($user) {
                                $app->where('applicant_id', $user->id)->where('status', 'accepted');
                            });
                    });
            })
            ->pluck('id');

        return Message::whereIn('conversation_id', $userConversationIds)
            ->where('sender_id', '!=', $user->id)
            ->where('is_read', false)
            ->count();
    }
}
