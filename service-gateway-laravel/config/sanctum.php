<?php

use Laravel\Sanctum\Sanctum;

return [

    /*
    |--------------------------------------------------------------------------
    | Expiration des jetons d'authentification stateful
    |--------------------------------------------------------------------------
    |
    | Cette valeur contrôle le nombre de minutes jusqu'à ce que les jetons
    | d'authentification stateful expirent. Cette valeur par défaut vous
    | donnera une protection raisonnable par défaut tout en offrant une
    | expérience utilisateur de longue durée.
    |
    */

    'expiration' => null,

    /*
    |--------------------------------------------------------------------------
    | Clé de jeton d'API Sanctum
    |--------------------------------------------------------------------------
    |
    | Cette valeur contrôle la clé utilisée pour chiffrer les jetons d'API
    | Sanctum dans votre base de données. Par défaut, la clé d'application
    | est utilisée, mais vous êtes libre de la modifier.
    |
    */

    'token_prefix' => env('SANCTUM_TOKEN_PREFIX', ''),

    /*
    |--------------------------------------------------------------------------
    | Middleware Sanctum
    |--------------------------------------------------------------------------
    |
    | Lors de l'authentification de l'application avec Sanctum, vous devrez
    | peut-être personnaliser certains middleware utilisés par Sanctum.
    | Vous pouvez modifier les middleware listés ci-dessous si nécessaire.
    |
    */

    'middleware' => [
        'verify_csrf_token' => App\Http\Middleware\VerifyCsrfToken::class,
        'encrypt_cookies' => App\Http\Middleware\EncryptCookies::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Domaines stateful
    |--------------------------------------------------------------------------
    |
    | Les requêtes provenant des domaines suivants/hôtes recevront une
    | authentification de session API stateful avec cookies. En général,
    | ce sont les domaines de votre application frontale locale et de production.
    |
    */

    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s%s',
        'localhost,localhost:3000,localhost:8000,127.0.0.1,127.0.0.1:8000,::1',
        Sanctum::currentApplicationUrlWithPort()
    ))),

    /*
    |--------------------------------------------------------------------------
    | Garde par défaut
    |--------------------------------------------------------------------------
    |
    | Cette option contrôle le garde d'authentification par défaut qui sera
    | utilisé pour authentifier les utilisateurs lors de l'utilisation de
    | Laravel Sanctum. Cette valeur par défaut peut être modifiée.
    |
    */

    'guard' => ['web'],

];
