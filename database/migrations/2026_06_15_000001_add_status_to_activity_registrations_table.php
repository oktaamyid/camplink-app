<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('activity_registrations', function (Blueprint $table) {
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending')->after('user_id');
            $table->timestamp('reviewed_at')->nullable()->after('status');

            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::table('activity_registrations', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropColumn(['status', 'reviewed_at']);
        });
    }
};
