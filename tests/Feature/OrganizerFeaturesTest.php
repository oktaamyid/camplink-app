<?php

use App\Models\Activity;
use App\Models\Announcement;
use App\Models\Category;
use App\Models\TeamApplication;
use App\Models\TeamRecruitment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

function createActivityWithCreator(): array
{
    $creator = User::factory()->create();
    $category = Category::create(['name' => 'Lomba']);

    $activity = Activity::create([
        'title' => 'Test Activity',
        'description' => 'Test description',
        'category_id' => $category->id,
        'creator_id' => $creator->id,
        'status' => 'active',
        'location' => 'Online',
        'event_date' => now()->addDays(10)->format('Y-m-d'),
        'deadline_date' => now()->addDays(5)->format('Y-m-d'),
    ]);

    return [$creator, $activity, $category];
}

// ─── Activity Edit ───────────────────────────────────

it('allows creator to view edit page', function () {
    [$creator, $activity] = createActivityWithCreator();

    $response = $this->actingAs($creator)->get(route('kegiatan.edit', $activity));

    $response->assertStatus(200);
});

it('prevents non-creator from viewing edit page', function () {
    [, $activity] = createActivityWithCreator();
    $otherUser = User::factory()->create();

    $response = $this->actingAs($otherUser)->get(route('kegiatan.edit', $activity));

    $response->assertStatus(403);
});

it('allows creator to update activity', function () {
    [$creator, $activity, $category] = createActivityWithCreator();

    $response = $this->actingAs($creator)->put(route('kegiatan.update', $activity), [
        'title' => 'Updated Title',
        'description' => 'Updated description',
        'category_id' => $category->id,
    ]);

    $response->assertRedirect(route('kegiatan.show', $activity));

    $this->assertDatabaseHas('activities', [
        'id' => $activity->id,
        'title' => 'Updated Title',
    ]);
});

it('prevents non-creator from updating activity', function () {
    [, $activity, $category] = createActivityWithCreator();
    $otherUser = User::factory()->create();

    $response = $this->actingAs($otherUser)->put(route('kegiatan.update', $activity), [
        'title' => 'Hacked Title',
        'description' => 'Hacked',
        'category_id' => $category->id,
    ]);

    $response->assertStatus(403);
});

// ─── Activity Delete (Cancel) ────────────────────────

it('allows creator to cancel activity', function () {
    [$creator, $activity] = createActivityWithCreator();

    $response = $this->actingAs($creator)->delete(route('kegiatan.destroy', $activity));

    $response->assertRedirect(route('kegiatan.index'));

    $this->assertDatabaseHas('activities', [
        'id' => $activity->id,
        'status' => 'cancelled',
    ]);
});

it('prevents non-creator from cancelling activity', function () {
    [, $activity] = createActivityWithCreator();
    $otherUser = User::factory()->create();

    $response = $this->actingAs($otherUser)->delete(route('kegiatan.destroy', $activity));

    $response->assertStatus(403);
});

// ─── Toggle Registration ─────────────────────────────

it('allows creator to close registration', function () {
    [$creator, $activity] = createActivityWithCreator();

    $response = $this->actingAs($creator)->post(route('kegiatan.toggleRegistration', $activity));

    $response->assertRedirect();

    $this->assertDatabaseHas('activities', [
        'id' => $activity->id,
        'status' => 'draft',
    ]);
});

it('allows creator to reopen registration', function () {
    [$creator, $activity] = createActivityWithCreator();
    $activity->update(['status' => 'draft']);

    $response = $this->actingAs($creator)->post(route('kegiatan.toggleRegistration', $activity));

    $response->assertRedirect();

    $this->assertDatabaseHas('activities', [
        'id' => $activity->id,
        'status' => 'active',
    ]);
});

// ─── Participants ────────────────────────────────────

it('allows creator to view participant list', function () {
    [$creator, $activity] = createActivityWithCreator();

    $response = $this->actingAs($creator)->get(route('kegiatan.peserta', $activity));

    $response->assertStatus(200);
});

it('prevents non-creator from viewing participant list', function () {
    [, $activity] = createActivityWithCreator();
    $otherUser = User::factory()->create();

    $response = $this->actingAs($otherUser)->get(route('kegiatan.peserta', $activity));

    $response->assertStatus(403);
});

// ─── Close Recruitment ───────────────────────────────

it('allows creator to close recruitment', function () {
    [$creator, $activity] = createActivityWithCreator();

    $recruitment = TeamRecruitment::create([
        'activity_id' => $activity->id,
        'total_slots' => 3,
        'skills_required' => [['title' => 'Backend', 'quota' => 1]],
        'status' => 'open',
    ]);

    $response = $this->actingAs($creator)->patch(route('tim.close', $recruitment));

    $response->assertSessionHas('success');

    $this->assertDatabaseHas('team_recruitments', [
        'id' => $recruitment->id,
        'status' => 'closed',
    ]);
});

it('allows creator to reopen recruitment', function () {
    [$creator, $activity] = createActivityWithCreator();

    $recruitment = TeamRecruitment::create([
        'activity_id' => $activity->id,
        'total_slots' => 3,
        'skills_required' => [['title' => 'Backend', 'quota' => 1]],
        'status' => 'closed',
    ]);

    $response = $this->actingAs($creator)->patch(route('tim.close', $recruitment));

    $response->assertSessionHas('success');

    $this->assertDatabaseHas('team_recruitments', [
        'id' => $recruitment->id,
        'status' => 'open',
    ]);
});

// ─── Remove Member ───────────────────────────────────

it('allows creator to remove accepted member', function () {
    [$creator, $activity] = createActivityWithCreator();
    $member = User::factory()->create();

    $recruitment = TeamRecruitment::create([
        'activity_id' => $activity->id,
        'total_slots' => 3,
        'filled_slots' => 1,
        'skills_required' => [['title' => 'Backend', 'quota' => 1]],
        'status' => 'open',
    ]);

    $application = TeamApplication::create([
        'recruitment_id' => $recruitment->id,
        'applicant_id' => $member->id,
        'message' => 'Hello',
        'role' => 'Backend',
        'status' => 'accepted',
    ]);

    $response = $this->actingAs($creator)->delete(route('tim.removeMember', $application));

    $response->assertSessionHas('success');

    $this->assertDatabaseHas('team_applications', [
        'id' => $application->id,
        'status' => 'rejected',
    ]);

    $this->assertDatabaseHas('team_recruitments', [
        'id' => $recruitment->id,
        'filled_slots' => 0,
    ]);
});

// ─── Update Member Role ──────────────────────────────

it('allows creator to update member role', function () {
    [$creator, $activity] = createActivityWithCreator();
    $member = User::factory()->create();

    $recruitment = TeamRecruitment::create([
        'activity_id' => $activity->id,
        'total_slots' => 3,
        'skills_required' => [['title' => 'Backend', 'quota' => 1], ['title' => 'Frontend', 'quota' => 1]],
        'status' => 'open',
    ]);

    $application = TeamApplication::create([
        'recruitment_id' => $recruitment->id,
        'applicant_id' => $member->id,
        'message' => 'Hello',
        'role' => 'Backend',
        'status' => 'accepted',
    ]);

    $response = $this->actingAs($creator)->patch(route('tim.updateRole', $application), [
        'role' => 'Frontend',
    ]);

    $response->assertSessionHas('success');

    $this->assertDatabaseHas('team_applications', [
        'id' => $application->id,
        'role' => 'Frontend',
    ]);
});

// ─── Announcements ───────────────────────────────────

it('allows creator to create announcement', function () {
    [$creator, $activity] = createActivityWithCreator();

    $response = $this->actingAs($creator)->post(route('pengumuman.store', $activity), [
        'title' => 'Pengumuman Penting',
        'content' => 'Jadwal telah berubah.',
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('announcements', [
        'activity_id' => $activity->id,
        'title' => 'Pengumuman Penting',
        'creator_id' => $creator->id,
    ]);
});

it('prevents non-creator from creating announcement', function () {
    [, $activity] = createActivityWithCreator();
    $otherUser = User::factory()->create();

    $response = $this->actingAs($otherUser)->post(route('pengumuman.store', $activity), [
        'title' => 'Hack',
        'content' => 'Hacked',
    ]);

    $response->assertStatus(403);
});

it('validates announcement data', function () {
    [$creator, $activity] = createActivityWithCreator();

    $response = $this->actingAs($creator)->post(route('pengumuman.store', $activity), [
        'title' => '',
        'content' => '',
    ]);

    $response->assertSessionHasErrors(['title', 'content']);
});
