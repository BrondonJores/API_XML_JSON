<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Créer un utilisateur administrateur par défaut.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin Canteen',
            'email' => 'admin@canteen.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);
    }
}
