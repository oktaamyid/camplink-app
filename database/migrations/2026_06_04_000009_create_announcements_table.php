<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('creator_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('activity_id')->nullable()->constrained('activities')->nullOnDelete();
            $table->string('title', 200);
            $table->text('content');
            $table->boolean('is_global')->default(true);
            $table->timestamps();

            $table->index('creator_id');
            $table->index('activity_id');
            $table->index('is_global');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
