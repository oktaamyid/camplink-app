<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TeamRecruitment extends Model
{
    protected $fillable = [
        'activity_id',
        'description',
        'skills_required',
        'total_slots',
        'filled_slots',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'total_slots' => 'integer',
            'filled_slots' => 'integer',
            'skills_required' => 'array',
        ];
    }

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(TeamApplication::class, 'recruitment_id');
    }
}
