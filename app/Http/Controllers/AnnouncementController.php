<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the announcements.
     */
    public function index(): Response
    {
        $announcements = Announcement::with('creator:id,name')
            ->where('is_active', true)
            ->latest()
            ->paginate(12);

        return Inertia::render('pengumuman/index', [
            'announcements' => $announcements,
        ]);
    }

    /**
     * Display the specified announcement.
     */
    public function show(Announcement $announcement): Response
    {
        $announcement->load('creator:id,name');

        return Inertia::render('pengumuman/show', [
            'announcement' => $announcement,
        ]);
    }

    /**
     * Store a newly created announcement. (Admin Only)
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'content' => 'required|string',
            'type' => 'required|in:general,activity',
            'activity_id' => 'nullable|exists:activities,id',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        $data = [
            'title' => $validated['title'],
            'content' => $validated['content'],
            'type' => $validated['type'],
            'activity_id' => $validated['activity_id'],
            'creator_id' => auth()->id(),
            'is_active' => true,
        ];

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('announcements/thumbnails', 'public');
            $data['thumbnail_url'] = Storage::url($path);
        }

        Announcement::create($data);

        return back()->with('success', 'Pengumuman berhasil diterbitkan.');
    }

    /**
     * Handle image upload from rich text editor.
     */
    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('announcements/content', 'public');

            return response()->json([
                'url' => Storage::url($path),
            ]);
        }

        return response()->json(['error' => 'Upload failed'], 400);
    }

    /**
     * Remove the specified announcement. (Admin Only)
     */
    public function destroy(Announcement $announcement): RedirectResponse
    {
        if ($announcement->thumbnail_url) {
            $oldPath = str_replace('/storage/', '', $announcement->thumbnail_url);
            Storage::disk('public')->delete($oldPath);
        }

        $announcement->delete();

        return back()->with('success', 'Pengumuman berhasil dihapus.');
    }
}
