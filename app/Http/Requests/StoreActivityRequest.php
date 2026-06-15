<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreActivityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->isAdmin() || $this->user()->isInisiator();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:200'],
            'description' => ['required', 'string'],
            'requirements' => ['nullable', 'string'],
            'category_id' => ['required', 'exists:categories,id'],
            'location' => ['nullable', 'string', 'max:255'],
            'is_online' => ['nullable', 'boolean'],
            'meeting_link' => ['nullable', 'url', 'max:255'],
            'event_date' => ['nullable', 'date'],
            'deadline_date' => ['nullable', 'date', 'before_or_equal:event_date'],
            'quota' => ['nullable', 'integer', 'min:1'],
            'contact' => ['nullable', 'string', 'max:255'],
            'poster' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'is_team_based' => ['nullable', 'boolean'],
            'has_participants' => ['nullable', 'boolean'],
            'team_leader_id' => ['nullable', 'exists:users,id'],
            'max_teams' => ['nullable', 'integer', 'min:1'],
            'max_members_per_team' => ['nullable', 'integer', 'min:1'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'category_id.required' => 'Kategori harus dipilih.',
            'category_id.exists' => 'Kategori yang dipilih tidak valid.',
            'title.required' => 'Judul kegiatan wajib diisi.',
            'description.required' => 'Deskripsi kegiatan wajib diisi.',
            'event_date.date' => 'Format tanggal pelaksanaan tidak valid.',
            'deadline_date.date' => 'Format batas akhir pendaftaran tidak valid.',
            'deadline_date.before_or_equal' => 'Batas akhir pendaftaran tidak boleh melebihi tanggal pelaksanaan.',
            'poster.image' => 'File harus berupa gambar.',
            'poster.mimes' => 'Gambar harus berformat: jpeg, png, atau jpg.',
            'poster.max' => 'Ukuran gambar maksimal adalah 2MB.',
        ];
    }
}
