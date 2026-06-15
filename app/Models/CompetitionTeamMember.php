<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompetitionTeamMember extends Model
{
    public const CREATED_AT = 'applied_at';

    public const UPDATED_AT = null;

    protected $fillable = [
        'team_id',
        'user_id',
        'status',
        'message',
        'reviewed_at',
    ];

    protected function casts(): array
    {
        return [
            'applied_at' => 'datetime',
            'reviewed_at' => 'datetime',
        ];
    }

    public function team(): BelongsTo
    {
        return $this->belongsTo(CompetitionTeam::class, 'team_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
