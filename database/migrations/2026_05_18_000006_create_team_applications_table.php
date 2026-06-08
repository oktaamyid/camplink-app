<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recruitment_id')->constrained('team_recruitments')->cascadeOnDelete();
            $table->foreignId('applicant_id')->constrained('users')->cascadeOnDelete();
            $table->text('message')->nullable();
            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending');
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamp('applied_at')->useCurrent();

            $table->unique(['recruitment_id', 'applicant_id']);
            $table->index('status');
            $table->index('applicant_id');
            $table->index('recruitment_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_applications');
    }
};
