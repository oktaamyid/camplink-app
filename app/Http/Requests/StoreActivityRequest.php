<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreActivityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:200'],
            'description' => ['required', 'string'],
            'category_id' => ['required', 'exists:categories,id'],
            'location' => ['nullable', 'string', 'max:255'],
            'event_date' => ['nullable', 'date'],
            'deadline_date' => ['nullable', 'date', 'before_or_equal:event_date'],
            'poster' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
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
