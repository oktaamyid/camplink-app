<?php

namespace App\Http\Controllers;

use App\Models\InisiatorRequest;
use App\Models\User;
use App\Notifications\InisiatorRequestSubmitted;
use App\Notifications\InisiatorRequestUpdated;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class InisiatorRequestController extends Controller
{
    public function create(): Response
    {
        $user = request()->user();

        // If already inisiator or admin, redirect
        if ($user->isInisiator() || $user->isAdmin()) {
            return Inertia::render('inisiator/request', [
                'alreadyHasRole' => true,
                'role' => $user->role,
            ]);
        }

        $existingRequest = InisiatorRequest::where('user_id', $user->id)->first();

        return Inertia::render('inisiator/request', [
            'existingRequest' => $existingRequest,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = request()->user();

        if ($user->isInisiator() || $user->isAdmin()) {
            return back()->with('error', 'Anda sudah memiliki hak akses inisiator.');
        }

        $request->validate([
            'proposal' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
            'ktm' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ]);

        $existingRequest = InisiatorRequest::where('user_id', $user->id)->first();
        if ($existingRequest && $existingRequest->status === 'pending') {
            return back()->with('error', 'Anda masih memiliki permohonan yang sedang diproses.');
        }

        $proposalPath = $request->file('proposal')->storePublicly('inisiator_requests/proposals');
        $ktmPath = $request->file('ktm')->storePublicly('inisiator_requests/ktm');

        $inisiatorRequest = InisiatorRequest::updateOrCreate(
            ['user_id' => $user->id],
            [
                'proposal_path' => Storage::url($proposalPath),
                'ktm_path' => Storage::url($ktmPath),
                'status' => 'pending',
                'admin_notes' => null,
            ]
        );

        // Notify Admins
        $admins = User::where('role', 'admin')->get();
        Notification::send($admins, new InisiatorRequestSubmitted($inisiatorRequest));

        return back()->with('success', 'Permohonan Anda berhasil dikirim dan sedang menunggu peninjauan admin.');
    }

    // Admin Methods
    public function adminIndex(): Response
    {
        $requests = InisiatorRequest::with('user')->latest()->get();

        return Inertia::render('admin/inisiator-requests', [
            'requests' => $requests,
        ]);
    }

    public function update(Request $request, InisiatorRequest $inisiatorRequest): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'in:approved,rejected'],
            'admin_notes' => ['nullable', 'string'],
        ]);

        $inisiatorRequest->update([
            'status' => $request->status,
            'admin_notes' => $request->admin_notes,
        ]);

        if ($request->status === 'approved') {
            $inisiatorRequest->user->update(['role' => 'inisiator']);
        }

        // Notify User
        $inisiatorRequest->user->notify(new InisiatorRequestUpdated($inisiatorRequest));

        return back()->with('success', 'Status permohonan berhasil diperbarui.');
    }
}
