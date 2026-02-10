<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function register(array $data): array
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'is_admin' => false,
        ]);

        $user->profile()->create([]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user->load(['profile', 'allergies', 'preferences']),
            'token' => $token,
        ];
    }

    public function login(string $email, string $password): ?array
    {
        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return null;
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user->load(['profile', 'allergies', 'preferences']),
            'token' => $token,
        ];
    }
}
