<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->time('event_time')->nullable()->after('event_date');
            $table->boolean('is_online')->default(false)->after('location');
            $table->string('meeting_link', 255)->nullable()->after('is_online');
            $table->text('requirements')->nullable()->after('description');
            $table->unsignedInteger('max_participants')->nullable()->after('requirements');
            $table->string('contact_person', 150)->nullable()->after('max_participants');
        });

        if (config('database.default') !== 'sqlite') {
            DB::statement("ALTER TABLE activities MODIFY COLUMN status ENUM('draft','active','completed','cancelled','invalid') NOT NULL DEFAULT 'draft'");
        } else {
            Schema::table('activities', function (Blueprint $table) {
                $table->string('status')->default('draft')->change();
            });
        }
    }

    public function down(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->dropColumn([
                'event_time',
                'is_online',
                'meeting_link',
                'requirements',
                'max_participants',
                'contact_person',
            ]);
        });

        if (config('database.default') !== 'sqlite') {
            DB::statement("ALTER TABLE activities MODIFY COLUMN status ENUM('active','invalid','completed') NOT NULL DEFAULT 'active'");
        } else {
            Schema::table('activities', function (Blueprint $table) {
                $table->string('status')->default('active')->change();
            });
        }
    }
};
