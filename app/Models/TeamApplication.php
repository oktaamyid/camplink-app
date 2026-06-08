<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeamApplication extends Model
{
    const CREATED_AT = 'applied_at';

    const UPDATED_AT = null;

    protected $fillable = [
        'recruitment_id',
        'applicant_id',
        'message',
        'role',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'reviewed_at' => 'datetime',
            'applied_at' => 'datetime',
        ];
    }

    public function recruitment(): BelongsTo
    {
        return $this->belongsTo(TeamRecruitment::class, 'recruitment_id');
    }

    public function applicant(): BelongsTo
    {
        return $this->belongsTo(User::class, 'applicant_id');
    }
}
