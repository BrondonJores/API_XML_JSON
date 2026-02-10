<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /*
    |--------------------------------------------------------------------------
    | Obtention du chemin de redirection pour les utilisateurs non authentifiés
    |--------------------------------------------------------------------------
    |
    | Cette méthode retourne le chemin vers lequel les utilisateurs non
    | authentifiés doivent être redirigés. Si null, une réponse JSON 401
    | sera retournée à la place.
    |
    */
    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('login');
    }
}
