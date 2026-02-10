<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /*
    |--------------------------------------------------------------------------
    | URIs exclues de la vérification CSRF
    |--------------------------------------------------------------------------
    |
    | Les URIs listées ici seront exclues de la vérification du jeton CSRF.
    | Ceci est généralement utilisé pour les webhooks et les callbacks API.
    |
    */
    protected $except = [];
}
