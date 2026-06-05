<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Announcement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function store(Request $request, Activity $kegiatan): RedirectResponse
    {
        if ($kegiatan->creator_id !== $request->user()->id) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'content' => ['required', 'string'],
        ], [
            'title.required' => 'Judul pengumuman wajib diisi.',
            'content.required' => 'Isi pengumuman wajib diisi.',
        ]);

        Announcement::create([
            'creator_id' => $request->user()->id,
            'activity_id' => $kegiatan->id,
            'title' => $validated['title'],
            'content' => $validated['content'],
            'is_global' => false,
        ]);

        return redirect()->back()->with('success', 'Pengumuman berhasil dibuat.');
    }
}
