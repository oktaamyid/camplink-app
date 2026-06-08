<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityRegistration;
use App\Models\Certificate;
use App\Models\User;
use App\Notifications\AdminCertificateAlert;
use App\Notifications\CertificateUploaded;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    /**
     * Display a listing of participants to manage certificates.
     */
    public function manage(Request $request, Activity $activity): Response
    {
        // Only creator or admin can manage certificates
        if ($activity->creator_id !== $request->user()->id && ! $request->user()->isAdmin()) {
            abort(403, 'Unauthorized access.');
        }

        $participants = ActivityRegistration::with(['user:id,name,email', 'activity:id,title'])
            ->where('activity_id', $activity->id)
            ->get();

        $certificates = Certificate::where('activity_id', $activity->id)->get()->keyBy('user_id');

        return Inertia::render('kegiatan/sertifikat', [
            'activity' => $activity->only('id', 'title'),
            'participants' => $participants->map(function ($reg) use ($certificates) {
                return [
                    'user_id' => $reg->user_id,
                    'name' => $reg->user->name,
                    'email' => $reg->user->email,
                    'certificate' => $certificates->has($reg->user_id) ? $certificates->get($reg->user_id) : null,
                ];
            }),
        ]);
    }

    /**
     * Bulk store or update certificates.
     */
    public function storeBulk(Request $request, Activity $activity): RedirectResponse
    {
        // Only creator or admin can manage certificates
        if ($activity->creator_id !== $request->user()->id && ! $request->user()->isAdmin()) {
            abort(403, 'Unauthorized access.');
        }

        $request->validate([
            'certificates' => 'nullable|array',
            'certificates.*' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ], [
            'certificates.*.mimes' => 'Sertifikat harus berupa file PDF, JPG, atau PNG.',
            'certificates.*.max' => 'Ukuran file sertifikat maksimal 5MB.',
        ]);

        $uploadedCount = 0;

        if ($request->has('certificates')) {
            foreach ($request->file('certificates') as $userId => $file) {
                // Verify user is actually registered
                $isRegistered = ActivityRegistration::where('activity_id', $activity->id)
                    ->where('user_id', $userId)
                    ->exists();

                if ($isRegistered && $file) {
                    $path = $file->store('certificates', 'public');
                    $fileUrl = Storage::url($path);

                    // Check if exists
                    $certificate = Certificate::where('activity_id', $activity->id)
                        ->where('user_id', $userId)
                        ->first();

                    if ($certificate) {
                        // Delete old file
                        $oldPath = str_replace('/storage/', '', $certificate->file_url);
                        Storage::disk('public')->delete($oldPath);

                        $certificate->update(['file_url' => $fileUrl]);
                    } else {
                        $certificate = Certificate::create([
                            'activity_id' => $activity->id,
                            'user_id' => $userId,
                            'file_url' => $fileUrl,
                            'certificate_code' => strtoupper(Str::random(10)),
                        ]);
                    }

                    // Notify User
                    $participant = User::find($userId);
                    if ($participant) {
                        $participant->notify(new CertificateUploaded($certificate));
                    }

                    $uploadedCount++;
                }
            }
        }

        if ($uploadedCount > 0) {
            // Notify Admins
            $admins = User::where('role', 'admin')->get();
            Notification::send($admins, new AdminCertificateAlert($activity, $uploadedCount));
        }

        return back()->with('success', "Berhasil mengunggah {$uploadedCount} sertifikat.");
    }
}
