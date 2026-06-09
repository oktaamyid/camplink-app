<?php

it('returns a successful response for guests visiting landing pages', function () {
    $this->get('/')->assertStatus(200);
    $this->get('/service')->assertStatus(200);
    $this->get('/about')->assertStatus(200);
    $this->get('/faq')->assertStatus(200);
});
