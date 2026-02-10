<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    /**
     * Inscription d'un nouvel utilisateur.
     *
     * @param array $data
     * @return array
     */
    public function register(array $data): array
    {
        // Créer l'utilisateur
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'is_admin' => $data['is_admin'] ?? false,
        ]);

        // Créer le profil de l'utilisateur
        $user->profile()->create([]);

        // Générer le token d'authentification
        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user->load('profile'),
            'token' => $token,
        ];
    }

    /**
     * Connexion d'un utilisateur.
     *
     * @param array $credentials
     * @return array
     * @throws ValidationException
     */
    public function login(array $credentials): array
    {
        // Rechercher l'utilisateur par email
        $user = User::where('email', $credentials['email'])->first();

        // Vérifier si l'utilisateur existe et si le mot de passe est correct
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les informations d\'identification fournies sont incorrectes.'],
            ]);
        }

        // Générer le token d'authentification
        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user->load(['profile', 'allergies', 'preferences']),
            'token' => $token,
        ];
    }

    /**
     * Déconnexion de l'utilisateur.
     *
     * @param User $user
     * @return bool
     */
    public function logout(User $user): bool
    {
        // Révoquer tous les tokens de l'utilisateur
        $user->tokens()->delete();

        return true;
    }

    /**
     * Obtenir les informations de l'utilisateur connecté.
     *
     * @param User $user
     * @return User
     */
    public function me(User $user): User
    {
        return $user->load(['profile', 'allergies', 'preferences']);
    }
}
