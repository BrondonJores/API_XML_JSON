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

    'allowed_methods' => ['*'],

    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:3000')),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
