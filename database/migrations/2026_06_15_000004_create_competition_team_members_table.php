<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('competition_team_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained('competition_teams')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('accepted');
            $table->text('message')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamp('applied_at')->useCurrent();

            $table->unique(['team_id', 'user_id']);
            $table->index('status');
            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('competition_team_members');
    }
};
