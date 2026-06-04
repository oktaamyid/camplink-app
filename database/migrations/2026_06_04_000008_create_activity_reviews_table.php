<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activity_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('activity_id')->constrained('activities')->cascadeOnDelete();
            $table->tinyInteger('rating')->unsigned();
            $table->text('review')->nullable();
            $table->boolean('is_reported')->default(false);
            $table->timestamps();

            $table->unique(['user_id', 'activity_id']);
            $table->index('activity_id');
            $table->index('rating');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_reviews');
    }
};
