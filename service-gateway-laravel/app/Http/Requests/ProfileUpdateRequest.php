<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:20',
            'address' => 'sometimes|string|max:255',
            'city' => 'sometimes|string|max:100',
            'postal_code' => 'sometimes|string|max:20',
            'country' => 'sometimes|string|max:100',
            'dietary_restrictions' => 'sometimes|array',
        ];
    }

    public function messages(): array
    {
        return [
            'name.string' => 'Le nom doit être une chaîne de caractères',
            'name.max' => 'Le nom ne peut pas dépasser 255 caractères',
            'phone.string' => 'Le téléphone doit être une chaîne de caractères',
            'dietary_restrictions.array' => 'Les restrictions alimentaires doivent être un tableau',
        ];
    }
}
