<?php

use App\Models\Activity;
use App\Models\ActivityReport;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('requires authentication to report an activity', function () {
    $category = Category::create(['name' => 'Seminar', 'slug' => 'seminar']);
    $creator = User::factory()->create();

    $activity = Activity::create([
        'title' => 'Sample Activity',
        'description' => 'Description of activity',
        'category_id' => $category->id,
        'creator_id' => $creator->id,
        'event_date' => now()->addDays(5)->format('Y-m-d'),
        'deadline_date' => now()->addDays(3)->format('Y-m-d'),
        'status' => 'active',
    ]);

    $response = $this->post(route('kegiatan.report', $activity->id), [
        'reason' => 'fake',
        'details' => 'This activity is fake.',
    ]);

    $response->assertRedirect(route('login'));
});

it('allows authenticated users to report an activity', function () {
    $category = Category::create(['name' => 'Seminar', 'slug' => 'seminar']);
    $creator = User::factory()->create();
    $reporter = User::factory()->create();

    $activity = Activity::create([
        'title' => 'Sample Activity',
        'description' => 'Description of activity',
        'category_id' => $category->id,
        'creator_id' => $creator->id,
        'event_date' => now()->addDays(5)->format('Y-m-d'),
        'deadline_date' => now()->addDays(3)->format('Y-m-d'),
        'status' => 'active',
    ]);

    $response = $this->actingAs($reporter)->post(route('kegiatan.report', $activity->id), [
        'reason' => 'fake',
        'details' => 'This activity is fake.',
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('activity_reports', [
        'activity_id' => $activity->id,
        'reporter_id' => $reporter->id,
        'reason' => 'fake',
        'details' => 'This activity is fake.',
        'status' => 'pending',
    ]);
});

it('does not allow the creator to report their own activity', function () {
    $category = Category::create(['name' => 'Seminar', 'slug' => 'seminar']);
    $creator = User::factory()->create();

    $activity = Activity::create([
        'title' => 'Sample Activity',
        'description' => 'Description of activity',
        'category_id' => $category->id,
        'creator_id' => $creator->id,
        'event_date' => now()->addDays(5)->format('Y-m-d'),
        'deadline_date' => now()->addDays(3)->format('Y-m-d'),
        'status' => 'active',
    ]);

    $response = $this->actingAs($creator)->post(route('kegiatan.report', $activity->id), [
        'reason' => 'fake',
        'details' => 'Self reporting test.',
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('error', 'Anda tidak dapat melaporkan kegiatan Anda sendiri.');

    $this->assertDatabaseMissing('activity_reports', [
        'activity_id' => $activity->id,
        'reporter_id' => $creator->id,
    ]);
});

it('validates report data', function () {
    $category = Category::create(['name' => 'Seminar', 'slug' => 'seminar']);
    $creator = User::factory()->create();
    $reporter = User::factory()->create();

    $activity = Activity::create([
        'title' => 'Sample Activity',
        'description' => 'Description of activity',
        'category_id' => $category->id,
        'creator_id' => $creator->id,
        'event_date' => now()->addDays(5)->format('Y-m-d'),
        'deadline_date' => now()->addDays(3)->format('Y-m-d'),
        'status' => 'active',
    ]);

    // Send invalid reason
    $response = $this->actingAs($reporter)->post(route('kegiatan.report', $activity->id), [
        'reason' => 'invalid_reason',
        'details' => 'This reason does not exist in our system.',
    ]);

    $response->assertSessionHasErrors(['reason']);

    // Send empty reason
    $response = $this->actingAs($reporter)->post(route('kegiatan.report', $activity->id), [
        'reason' => '',
        'details' => 'No reason given.',
    ]);

    $response->assertSessionHasErrors(['reason']);
});

it('sends a notification to the reporter when the report is resolved', function () {
    $category = Category::create(['name' => 'Seminar', 'slug' => 'seminar']);
    $creator = User::factory()->create();
    $reporter = User::factory()->create();

    $activity = Activity::create([
        'title' => 'Sample Activity',
        'description' => 'Description of activity',
        'category_id' => $category->id,
        'creator_id' => $creator->id,
        'event_date' => now()->addDays(5)->format('Y-m-d'),
        'deadline_date' => now()->addDays(3)->format('Y-m-d'),
        'status' => 'active',
    ]);

    $report = ActivityReport::create([
        'activity_id' => $activity->id,
        'reporter_id' => $reporter->id,
        'reason' => 'fake',
        'details' => 'This is fake.',
        'status' => 'pending',
    ]);

    $admin = User::factory()->create(['role' => 'admin']);

    $response = $this->actingAs($admin)->patch(route('admin.reports.resolve', $report->id), [
        'status' => 'resolved',
        'admin_note' => 'Thank you for reporting.',
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertEquals('resolved', $report->fresh()->status);
    $this->assertEquals('Thank you for reporting.', $report->fresh()->admin_note);

    $this->assertDatabaseHas('notifications', [
        'notifiable_id' => $reporter->id,
        'type' => 'App\Notifications\ActivityReportUpdated',
    ]);
});
