<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Activity extends Model
{
    protected $fillable = [
        'title',
        'description',
        'requirements',
        'category_id',
        'creator_id',
        'location',
        'is_online',
        'meeting_link',
        'event_date',
        'deadline_date',
        'quota',
        'contact',
        'poster_url',
        'status',
        'is_team_based',
        'has_participants',
        'is_verified',
        'team_leader_id',
        'max_teams',
        'max_members_per_team',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date',
            'deadline_date' => 'date',
            'is_team_based' => 'boolean',
            'has_participants' => 'boolean',
            'is_verified' => 'boolean',
            'is_online' => 'boolean',
            'quota' => 'integer',
            'max_teams' => 'integer',
            'max_members_per_team' => 'integer',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function teamLeader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'team_leader_id');
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(ActivityRegistration::class);
    }

    public function recruitment(): HasOne
    {
        return $this->hasOne(TeamRecruitment::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(ActivityReview::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(ActivityReport::class);
    }

    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class);
    }

    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class);
    }

    public function competitionTeams(): HasMany
    {
        return $this->hasMany(CompetitionTeam::class);
    }

    public function groupConversation(): HasOne
    {
        return $this->hasOne(Conversation::class);
    }
}
