<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['mahasiswa', 'admin'])->default('mahasiswa')->after('password');
            $table->text('bio')->nullable()->after('role');
            $table->text('skills')->nullable()->after('bio');
            $table->string('profile_pic')->nullable()->after('skills');
            $table->boolean('is_active')->default(true)->after('profile_pic');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'bio', 'skills', 'profile_pic', 'is_active']);
        });
    }
};
