<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAllergy extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'allergen',
        'severity',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
