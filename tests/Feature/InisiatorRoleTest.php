<?php

namespace Tests\Feature;

use App\Http\Middleware\VerifyCsrfToken;
use App\Models\Category;
use App\Models\InisiatorRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class InisiatorRoleTest extends TestCase
{
    use RefreshDatabase;

    protected $category;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware(VerifyCsrfToken::class);
        Storage::fake('public');
        $this->category = Category::create(['name' => 'Test Category', 'slug' => 'test-category']);
    }

    public function test_mahasiswa_cannot_access_create_activity_page()
    {
        $user = User::factory()->create(['role' => 'mahasiswa']);

        $response = $this->actingAs($user)->get(route('kegiatan.buat'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('inisiator/request'));
    }

    public function test_mahasiswa_can_submit_inisiator_request()
    {
        $user = User::factory()->create(['role' => 'mahasiswa']);

        $response = $this->actingAs($user)
            ->post(route('inisiator.request.store'), [
                'proposal' => UploadedFile::fake()->create('proposal.pdf', 1000),
                'ktm' => UploadedFile::fake()->create('ktm.jpg', 500),
            ]);

        $response->assertRedirect();
        $this->assertEquals(1, InisiatorRequest::where('user_id', $user->id)->count());
        $this->assertEquals('pending', InisiatorRequest::where('user_id', $user->id)->first()->status);
    }

    public function test_admin_can_approve_inisiator_request()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create(['role' => 'mahasiswa']);

        $inisiatorRequest = InisiatorRequest::create([
            'user_id' => $user->id,
            'proposal_path' => '/storage/test/prop.pdf',
            'ktm_path' => '/storage/test/ktm.jpg',
            'status' => 'pending',
        ]);

        $response = $this->actingAs($admin)
            ->patch(route('admin.inisiator-requests.update', $inisiatorRequest->id), [
                'status' => 'approved',
                'admin_notes' => 'Selamat!',
            ]);

        $response->assertRedirect();
        $this->assertEquals('inisiator', $user->fresh()->role);
        $this->assertEquals('approved', $inisiatorRequest->fresh()->status);
    }

    public function test_inisiator_can_access_create_activity_page()
    {
        $user = User::factory()->create(['role' => 'inisiator']);

        $response = $this->actingAs($user)->get(route('kegiatan.buat'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('kegiatan/buat'));
    }

    public function test_admin_shares_pending_inisiators_count()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user1 = User::factory()->create(['role' => 'mahasiswa']);
        $user2 = User::factory()->create(['role' => 'mahasiswa']);

        InisiatorRequest::create([
            'user_id' => $user1->id,
            'proposal_path' => '/storage/test/prop1.pdf',
            'ktm_path' => '/storage/test/ktm1.jpg',
            'status' => 'pending',
        ]);

        InisiatorRequest::create([
            'user_id' => $user2->id,
            'proposal_path' => '/storage/test/prop2.pdf',
            'ktm_path' => '/storage/test/ktm2.jpg',
            'status' => 'approved',
        ]);

        $response = $this->actingAs($admin)->get(route('dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('auth.user.pending_inisiators_count', 1)
        );

        $responseNonAdmin = $this->actingAs($user1)->get(route('dashboard'));
        $responseNonAdmin->assertInertia(fn ($page) => $page
            ->where('auth.user.pending_inisiators_count', 0)
        );
    }
}
