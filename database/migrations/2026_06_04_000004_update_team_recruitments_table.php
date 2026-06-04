<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('team_recruitments', function (Blueprint $table) {
            $table->string('team_name', 150)->nullable()->after('activity_id');
            $table->text('positions_needed')->nullable()->after('skills_required');
            $table->date('deadline_date')->nullable()->after('positions_needed');
        });
    }

    public function down(): void
    {
        Schema::table('team_recruitments', function (Blueprint $table) {
            $table->dropColumn(['team_name', 'positions_needed', 'deadline_date']);
        });
    }
};
