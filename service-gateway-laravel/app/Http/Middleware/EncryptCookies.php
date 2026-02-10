<?php

namespace App\Http\Middleware;

use Illuminate\Cookie\Middleware\EncryptCookies as Middleware;

class EncryptCookies extends Middleware
{
    /*
    |--------------------------------------------------------------------------
    | Noms des cookies qui ne doivent pas être chiffrés
    |--------------------------------------------------------------------------
    |
    | Cette propriété contient les noms des cookies qui ne doivent pas être
    | automatiquement chiffrés par Laravel.
    |
    */
    protected $except = [];
}
