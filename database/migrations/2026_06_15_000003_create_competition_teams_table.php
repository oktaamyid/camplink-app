<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('competition_teams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activity_id')->constrained('activities')->cascadeOnDelete();
            $table->foreignId('leader_id')->constrained('users')->cascadeOnDelete();
            $table->string('name', 100);
            $table->timestamps();

            $table->index('activity_id');
            $table->index('leader_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('competition_teams');
    }
};
