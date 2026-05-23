<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_recruitments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activity_id')->unique()->constrained('activities')->cascadeOnDelete();
            $table->text('description')->nullable();
            $table->text('skills_required')->nullable();
            $table->integer('total_slots')->default(1);
            $table->integer('filled_slots')->default(0);
            $table->enum('status', ['open', 'closed'])->default('open');
            $table->timestamps();

            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_recruitments');
    }
};
