<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityRegistration;
use App\Models\TeamApplication;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        $data = [];

        if ($user->isAdmin()) {
            $data = [
                'totalUsers' => User::count(),
                'totalActivities' => Activity::count(),
                'activeActivities' => Activity::where('status', 'active')->count(),
                'totalApplications' => TeamApplication::count(),
            ];
        } else {
            // User Data
            $data = [
                'totalApplications' => TeamApplication::where('applicant_id', $user->id)->count(),
                'acceptedApplications' => TeamApplication::where('applicant_id', $user->id)->where('status', 'accepted')->count(),
                'totalActivities' => ActivityRegistration::where('user_id', $user->id)->count(),
                'managedTeams' => Activity::where('creator_id', $user->id)->whereHas('recruitment')->count(),
                
                // Fetch recent applications for the activity feed
                'recentApplications' => TeamApplication::where('applicant_id', $user->id)
                    ->with('recruitment.activity:id,title')
                    ->latest()
                    ->take(5)
                    ->get()
                    ->map(function ($app) {
                        return [
                            'id' => $app->id,
                            'type' => 'team_application',
                            'title' => 'Melamar tim: ' . ($app->recruitment->activity->title ?? 'Kegiatan'),
                            'status' => $app->status,
                            'time' => optional($app->applied_at)->diffForHumans() ?? '-'
                        ];
                    }),
                    
                // Fetch recent registrations
                'recentRegistrations' => ActivityRegistration::where('user_id', $user->id)
                    ->with('activity:id,title')
                    ->latest()
                    ->take(5)
                    ->get()
                    ->map(function ($reg) {
                        return [
                            'id' => $reg->id,
                            'type' => 'event_registration',
                            'title' => 'Mendaftar kegiatan: ' . ($reg->activity->title ?? 'Kegiatan'),
                            'status' => 'registered',
                            'time' => optional($reg->registered_at)->diffForHumans() ?? '-'
                        ];
                    })
            ];
            
            // Combine and sort recent activities
            $recentActivity = collect($data['recentApplications'])
                ->merge($data['recentRegistrations'])
                ->sortByDesc('time') // Rough sort, in real app parse dates
                ->take(5)
                ->values();
                
            $data['recentActivity'] = $recentActivity;
        }

        return Inertia::render('dashboard', [
            'isAdmin' => $user->isAdmin(),
            'stats' => $data,
        ]);
    }
}
