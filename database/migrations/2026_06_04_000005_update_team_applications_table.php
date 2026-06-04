<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('team_applications', function (Blueprint $table) {
            $table->string('position_applied', 100)->nullable()->after('applicant_id');
            $table->text('supporting_skills')->nullable()->after('message');
            $table->text('experience')->nullable()->after('supporting_skills');
        });
    }

    public function down(): void
    {
        Schema::table('team_applications', function (Blueprint $table) {
            $table->dropColumn(['position_applied', 'supporting_skills', 'experience']);
        });
    }
};
