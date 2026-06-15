<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CompetitionTeam extends Model
{
    protected $fillable = [
        'activity_id',
        'leader_id',
        'name',
    ];

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }

    public function leader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'leader_id');
    }

    public function members(): HasMany
    {
        return $this->hasMany(CompetitionTeamMember::class, 'team_id');
    }

    public function acceptedMembers(): HasMany
    {
        return $this->hasMany(CompetitionTeamMember::class, 'team_id')->where('status', 'accepted');
    }

    public function pendingMembers(): HasMany
    {
        return $this->hasMany(CompetitionTeamMember::class, 'team_id')->where('status', 'pending');
    }
}
