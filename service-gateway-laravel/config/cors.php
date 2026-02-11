<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Configuration CORS (Cross-Origin Resource Sharing)
    |--------------------------------------------------------------------------
    |
    | Ici vous pouvez configurer vos paramètres pour les requêtes cross-origin.
    | Veuillez consulter le lien ci-dessous pour plus d'informations sur
    | les options disponibles. La configuration par défaut est restrictive.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:3000,http://localhost:8003')),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With'],

    'exposed_headers' => [],

    'max_age' => 3600,

    'supports_credentials' => true,

];
