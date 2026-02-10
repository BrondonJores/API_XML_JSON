<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'phone',
        'address',
        'city',
        'postal_code',
        'country',
        'dietary_restrictions',
    ];

    protected $casts = [
        'dietary_restrictions' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
