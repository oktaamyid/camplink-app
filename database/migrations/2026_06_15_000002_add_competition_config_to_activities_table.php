<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->unsignedInteger('max_teams')->nullable()->after('has_participants');
            $table->unsignedInteger('max_members_per_team')->nullable()->after('max_teams');
        });
    }

    public function down(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->dropColumn(['max_teams', 'max_members_per_team']);
        });
    }
};
