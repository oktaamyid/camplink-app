<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    const UPDATED_AT = null;

    protected $fillable = [
        'name',
        'description',
        'icon',
    ];

    public function activities(): HasMany
    {
        return $this->hasMany(Activity::class);
    }
}
