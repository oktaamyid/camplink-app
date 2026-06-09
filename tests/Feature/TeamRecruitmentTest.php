<?php

use App\Models\Activity;
use App\Models\Category;
use App\Models\TeamApplication;
use App\Models\TeamRecruitment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('allows event creator to open team recruitment', function () {
    $creator = User::factory()->create();
    $category = Category::create(['name' => 'Lomba', 'slug' => 'lomba']);

    $activity = Activity::create([
        'title' => 'Lomba Startup',
        'description' => 'Test event',
        'category_id' => $category->id,
        'creator_id' => $creator->id,
        'status' => 'active',
        'is_team_based' => true,
    ]);

    $response = $this->actingAs($creator)->post("/kegiatan/{$activity->id}/tim", [
        'description' => 'Mencari anggota tim',
        'total_slots' => 2,
        'skills_required' => [
            ['title' => 'Backend', 'quota' => 1],
            ['title' => 'Frontend', 'quota' => 1],
        ],
    ]);

    $response->assertSessionHas('success');

    $this->assertDatabaseHas('team_recruitments', [
        'activity_id' => $activity->id,
        'total_slots' => 2,
    ]);
});

it('allows another user to apply to recruitment', function () {
    $creator = User::factory()->create();
    $applicant = User::factory()->create();
    $category = Category::create(['name' => 'Lomba', 'slug' => 'lomba']);

    $activity = Activity::create([
        'title' => 'Lomba Startup',
        'description' => 'Test event',
        'category_id' => $category->id,
        'creator_id' => $creator->id,
        'status' => 'active',
        'is_team_based' => true,
    ]);

    $recruitment = TeamRecruitment::create([
        'activity_id' => $activity->id,
        'total_slots' => 2,
        'skills_required' => [
            ['title' => 'Backend', 'quota' => 1],
        ],
    ]);

    $response = $this->actingAs($applicant)->post("/tim/{$recruitment->id}/apply", [
        'role' => 'Backend',
        'message' => 'Saya pengalaman 2 tahun PHP.',
    ]);

    $response->assertSessionHas('success');

    $this->assertDatabaseHas('team_applications', [
        'recruitment_id' => $recruitment->id,
        'applicant_id' => $applicant->id,
        'role' => 'Backend',
    ]);
});

it('allows creator to accept application', function () {
    $creator = User::factory()->create();
    $applicant = User::factory()->create();
    $category = Category::create(['name' => 'Lomba', 'slug' => 'lomba']);

    $activity = Activity::create([
        'title' => 'Lomba Startup',
        'description' => 'Test event',
        'category_id' => $category->id,
        'creator_id' => $creator->id,
        'status' => 'active',
        'is_team_based' => true,
    ]);

    $recruitment = TeamRecruitment::create([
        'activity_id' => $activity->id,
        'total_slots' => 2,
        'skills_required' => [
            ['title' => 'Backend', 'quota' => 1],
        ],
    ]);

    $application = TeamApplication::create([
        'recruitment_id' => $recruitment->id,
        'applicant_id' => $applicant->id,
        'message' => 'Halo',
        'role' => 'Backend',
        'status' => 'pending',
    ]);

    $response = $this->actingAs($creator)->patch("/aplikasi/{$application->id}/status", [
        'status' => 'accepted',
    ]);

    $response->assertSessionHas('success');

    $this->assertDatabaseHas('team_applications', [
        'id' => $application->id,
        'status' => 'accepted',
    ]);

    $this->assertDatabaseHas('team_recruitments', [
        'id' => $recruitment->id,
        'filled_slots' => 1,
    ]);
});
