<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('study_program', 100)->nullable()->after('is_active');
            $table->tinyInteger('semester')->unsigned()->nullable()->after('study_program');
            $table->text('interests')->nullable()->after('semester');
            $table->string('portfolio_url', 255)->nullable()->after('interests');
            $table->string('github_url', 255)->nullable()->after('portfolio_url');
            $table->string('linkedin_url', 255)->nullable()->after('github_url');
            $table->string('phone', 20)->nullable()->after('linkedin_url');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'study_program',
                'semester',
                'interests',
                'portfolio_url',
                'github_url',
                'linkedin_url',
                'phone',
            ]);
        });
    }
};
