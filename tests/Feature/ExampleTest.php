<?php

use Inertia\Testing\AssertableInertia as Assert;

it('returns a successful response for guests visiting landing pages', function () {
    $this->get('/')
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('welcome/home')
            ->has('upcomingEvents')
        );

    $this->get('/service')->assertStatus(200);
    $this->get('/about')->assertStatus(200);
    $this->get('/faq')->assertStatus(200);
});
