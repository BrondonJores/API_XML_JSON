<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Les attributs qui sont assignables en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * Les attributs qui doivent être cachés pour la sérialisation.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Les attributs qui doivent être castés.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Obtenir le profil associé à l'utilisateur.
     */
    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }

    /**
     * Obtenir les allergies associées à l'utilisateur.
     */
    public function allergies()
    {
        return $this->hasMany(UserAllergy::class);
    }

    /**
     * Obtenir les préférences associées à l'utilisateur.
     */
    public function preferences()
    {
        return $this->hasMany(UserPreference::class);
    }
}
