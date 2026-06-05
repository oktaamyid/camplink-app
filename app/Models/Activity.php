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
        'category_id',
        'creator_id',
        'location',
        'event_date',
        'deadline_date',
        'poster_url',
        'status',
        'is_team_based',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date',
            'deadline_date' => 'date',
            'is_team_based' => 'boolean',
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

    public function registrations(): HasMany
    {
        return $this->hasMany(ActivityRegistration::class);
    }

    public function recruitment(): HasOne
    {
        return $this->hasOne(TeamRecruitment::class);
    }

    public function announcements(): HasMany
    {
        return $this->hasMany(Announcement::class)->latest();
    }
}
