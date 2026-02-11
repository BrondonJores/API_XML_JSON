<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Configuration Laravel Sanctum
    |--------------------------------------------------------------------------
    |
    | Sanctum fournit un système d'authentification léger pour les SPA
    | (applications à page unique), applications mobiles et API simples
    | basées sur des tokens.
    |
    */

    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s%s',
        'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1',
        env('APP_URL') ? ','.parse_url(env('APP_URL'), PHP_URL_HOST) : ''
    ))),

    'guard' => ['web'],

    'expiration' => env('SANCTUM_EXPIRATION', 60), // 60 minutes par defaut

    'middleware' => [
        'verify_csrf_token' => App\Http\Middleware\VerifyCsrfToken::class,
        'encrypt_cookies' => App\Http\Middleware\EncryptCookies::class,
    ],

];
