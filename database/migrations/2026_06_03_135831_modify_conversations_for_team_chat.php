<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('conversations', function (Blueprint $table) {
            $table->foreignId('team_recruitment_id')->nullable()->after('id')->constrained('team_recruitments')->cascadeOnDelete();
            $table->unsignedBigInteger('user_one_id')->nullable()->change();
            $table->unsignedBigInteger('user_two_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('conversations', function (Blueprint $table) {
            $table->dropForeign(['team_recruitment_id']);
            $table->dropColumn('team_recruitment_id');
            $table->unsignedBigInteger('user_one_id')->nullable(false)->change();
            $table->unsignedBigInteger('user_two_id')->nullable(false)->change();
        });
    }
};
