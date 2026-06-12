<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'role',
        'bio',
        'university',
        'major',
        'semester',
        'location',
        'skills',
        'interests',
        'experience',
        'education',
        'external_certificates',
        'profile_pic',
        'is_active',
        'website_url',
        'github_url',
        'linkedin_url',
        'instagram_url',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
            'experience' => 'array',
            'education' => 'array',
            'external_certificates' => 'array',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isInisiator(): bool
    {
        return $this->role === 'inisiator';
    }

    public function inisiatorRequest(): HasOne
    {
        return $this->hasOne(InisiatorRequest::class);
    }

    public function activities(): HasMany
    {
        return $this->hasMany(Activity::class, 'creator_id');
    }

    public function activityRegistrations(): HasMany
    {
        return $this->hasMany(ActivityRegistration::class);
    }

    public function teamApplications(): HasMany
    {
        return $this->hasMany(TeamApplication::class, 'applicant_id');
    }

    public function announcements(): HasMany
    {
        return $this->hasMany(Announcement::class, 'creator_id');
    }

    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class);
    }

    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class);
    }
}
