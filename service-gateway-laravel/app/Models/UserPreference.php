<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    use HasFactory;

    /**
     * Les attributs qui sont assignables en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'preference',
    ];

    /**
     * Obtenir l'utilisateur qui possède la préférence.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
