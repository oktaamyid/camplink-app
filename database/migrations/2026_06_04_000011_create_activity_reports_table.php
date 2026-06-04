<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activity_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reporter_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('activity_id')->constrained('activities')->cascadeOnDelete();
            $table->enum('reason', ['fake', 'duplicate', 'wrong_info', 'unclear_organizer']);
            $table->text('description')->nullable();
            $table->enum('status', ['pending', 'reviewed', 'resolved'])->default('pending');
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();

            $table->index('activity_id');
            $table->index('reporter_id');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_reports');
    }
};
