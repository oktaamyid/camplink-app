<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActivityReview extends Model
{
    protected $fillable = [
        'user_id',
        'activity_id',
        'rating',
        'review',
        'is_reported',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'is_reported' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }
}
