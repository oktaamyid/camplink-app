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
            $table->unsignedInteger('max_participants')->nullable()->after('deadline_date');
            $table->boolean('registration_closed')->default(false)->after('max_participants');
            $table->boolean('is_online')->default(false)->after('registration_closed');
            $table->string('meeting_url')->nullable()->after('is_online');
            $table->string('contact_person')->nullable()->after('meeting_url');
            $table->text('requirements')->nullable()->after('contact_person');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->dropColumn([
                'max_participants',
                'registration_closed',
                'is_online',
                'meeting_url',
                'contact_person',
                'requirements',
            ]);
        });
    }
};
