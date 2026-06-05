<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'study_program')) {
                $table->string('study_program', 100)->nullable()->after('is_active');
            }
            if (! Schema::hasColumn('users', 'semester')) {
                $table->tinyInteger('semester')->unsigned()->nullable()->after('study_program');
            }
            if (! Schema::hasColumn('users', 'interests')) {
                $table->text('interests')->nullable()->after('semester');
            }
            if (! Schema::hasColumn('users', 'portfolio_url')) {
                $table->string('portfolio_url', 255)->nullable()->after('interests');
            }
            if (! Schema::hasColumn('users', 'github_url')) {
                $table->string('github_url', 255)->nullable()->after('portfolio_url');
            }
            if (! Schema::hasColumn('users', 'linkedin_url')) {
                $table->string('linkedin_url', 255)->nullable()->after('github_url');
            }
            if (! Schema::hasColumn('users', 'phone')) {
                $table->string('phone', 20)->nullable()->after('linkedin_url');
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $columnsToDrop = [];
            foreach (['study_program', 'portfolio_url', 'github_url', 'linkedin_url', 'phone'] as $column) {
                if (Schema::hasColumn('users', $column)) {
                    $columnsToDrop[] = $column;
                }
            }
            if (! empty($columnsToDrop)) {
                $table->dropColumn($columnsToDrop);
            }
        });
    }
};
