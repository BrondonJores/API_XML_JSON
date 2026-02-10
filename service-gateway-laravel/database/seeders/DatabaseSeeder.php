<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Peupler la base de données de l'application.
     */
    public function run(): void
    {
        // Créer un utilisateur administrateur par défaut
        User::create([
            'name' => 'Administrateur',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ])->profile()->create([
            'phone' => '+33123456789',
            'address' => '123 Rue de la Paix',
            'city' => 'Paris',
            'postal_code' => '75001',
            'country' => 'France',
        ]);

        // Créer un utilisateur normal par défaut
        $user = User::create([
            'name' => 'Utilisateur Test',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'is_admin' => false,
        ]);

        // Créer le profil de l'utilisateur
        $user->profile()->create([
            'phone' => '+33987654321',
            'address' => '456 Avenue des Champs',
            'city' => 'Lyon',
            'postal_code' => '69001',
            'country' => 'France',
        ]);

        // Ajouter des allergies
        $user->allergies()->createMany([
            ['allergy_name' => 'Arachides', 'severity' => 'high'],
            ['allergy_name' => 'Lactose', 'severity' => 'medium'],
        ]);

        // Ajouter des préférences
        $user->preferences()->createMany([
            ['preference_key' => 'cuisine', 'preference_value' => 'italienne'],
            ['preference_key' => 'regime', 'preference_value' => 'vegetarien'],
        ]);
    }
}
