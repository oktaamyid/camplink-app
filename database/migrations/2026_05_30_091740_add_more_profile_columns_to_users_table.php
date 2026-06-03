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
        Schema::table('users', function (Blueprint $table) {
            $table->string('university')->nullable()->after('bio');
            $table->string('major')->nullable()->after('university');
            $table->string('semester')->nullable()->after('major');
            $table->string('location')->nullable()->after('semester');
            $table->text('interests')->nullable()->after('skills');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['university', 'major', 'semester', 'location', 'interests']);
        });
    }
};
