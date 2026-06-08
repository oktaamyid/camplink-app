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
        Schema::table('activities', function (Blueprint $table) {
            $table->boolean('is_online')->default(false)->after('location');
            $table->string('meeting_link')->nullable()->after('is_online');
            $table->text('requirements')->nullable()->after('description');
            $table->integer('quota')->nullable()->after('deadline_date');
            $table->string('contact')->nullable()->after('quota');
            $table->enum('status', ['draft', 'active', 'completed', 'cancelled', 'invalid'])->default('active')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->dropColumn(['is_online', 'meeting_link', 'requirements', 'quota', 'contact']);
            // Note: Reverting enum status is complex in MySQL without raw SQL, skipping for simplicity in down()
        });
    }
};
