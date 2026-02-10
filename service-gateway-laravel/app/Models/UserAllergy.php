<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAllergy extends Model
{
    use HasFactory;

    /**
     * Les attributs qui sont assignables en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'allergy_name',
        'severity',
    ];

    /**
     * Obtenir l'utilisateur qui possède l'allergie.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
