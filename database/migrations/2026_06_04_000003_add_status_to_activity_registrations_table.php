<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('activity_registrations', function (Blueprint $table) {
            $table->enum('status', ['registered', 'cancelled'])->default('registered')->after('registered_at');
        });
    }

    public function down(): void
    {
        Schema::table('activity_registrations', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
