<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200);
            $table->text('description');
            $table->foreignId('category_id')->constrained('categories')->restrictOnDelete();
            $table->foreignId('creator_id')->constrained('users')->cascadeOnDelete();
            $table->string('location', 255)->nullable();
            $table->date('event_date')->nullable();
            $table->date('deadline_date')->nullable();
            $table->string('poster_url', 255)->nullable();
            $table->enum('status', ['active', 'invalid', 'completed'])->default('active');
            $table->boolean('is_team_based')->default(false);
            $table->timestamps();

            $table->index('status');
            $table->index('category_id');
            $table->index('creator_id');
            if (config('database.default') !== 'sqlite' && config('database.connections.'.config('database.default').'.driver') !== 'sqlite' && \Illuminate\Support\Facades\DB::connection()->getDriverName() !== 'sqlite') {
                $table->fullText(['title', 'description']);
            }
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
