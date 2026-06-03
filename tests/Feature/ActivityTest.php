<?php

use App\Models\Activity;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('requires authentication to create an activity', function () {
    $response = $this->get(route('kegiatan.buat'));
    $response->assertRedirect(route('login'));

    $response = $this->post(route('kegiatan.store'), []);
    $response->assertRedirect(route('login'));
});

it('allows authenticated users to view the create activity page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('kegiatan.buat'));

    $response->assertStatus(200);
});

it('allows authenticated users to store an activity', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $category = Category::create([
        'name' => 'Seminar',
        'description' => 'Seminar category',
    ]);

    $file = UploadedFile::fake()->create('poster.jpg', 100, 'image/jpeg');

    $data = [
        'title' => 'Test Activity',
        'description' => 'This is a test activity.',
        'category_id' => $category->id,
        'location' => 'Online',
        'event_date' => now()->addDays(5)->format('Y-m-d'),
        'deadline_date' => now()->addDays(3)->format('Y-m-d'),
        'poster' => $file,
    ];

    $response = $this->actingAs($user)->post(route('kegiatan.store'), $data);

    $response->assertRedirect(route('kegiatan.index'));

    $this->assertDatabaseHas('activities', [
        'title' => 'Test Activity',
        'category_id' => $category->id,
        'creator_id' => $user->id,
    ]);
});

it('validates activity creation data', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('kegiatan.store'), [
        'title' => '',
        'category_id' => 999,
        'deadline_date' => now()->addDays(5)->format('Y-m-d'),
        'event_date' => now()->format('Y-m-d'), // deadline is after event date, should fail
    ]);

    $response->assertSessionHasErrors(['title', 'category_id', 'deadline_date']);
});

it('can display the activity detail page', function () {
    $user = User::factory()->create();
    $category = Category::create([
        'name' => 'Workshop',
    ]);

    $activity = Activity::create([
        'title' => 'Sample Workshop',
        'description' => 'Workshop details',
        'category_id' => $category->id,
        'creator_id' => $user->id,
        'location' => 'Campus',
        'event_date' => now()->addDays(10)->format('Y-m-d'),
        'deadline_date' => now()->addDays(5)->format('Y-m-d'),
        'status' => 'active',
    ]);

    $response = $this->get(route('kegiatan.show', $activity));

    $response->assertStatus(200);
});
