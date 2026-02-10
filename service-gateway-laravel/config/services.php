<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Configuration des services tiers
    |--------------------------------------------------------------------------
    |
    | Ce fichier sert à configurer les services tiers que votre application
    | utilise. Les informations de configuration pour les microservices
    | et autres services externes sont stockées ici.
    |
    */

    'menu' => [
        'url' => env('MENU_SERVICE_URL', 'http://service-menu:8080'),
        'timeout' => env('MENU_SERVICE_TIMEOUT', 30),
    ],

    'orders' => [
        'url' => env('ORDERS_SERVICE_URL', 'http://service-orders:5000'),
        'timeout' => env('ORDERS_SERVICE_TIMEOUT', 30),
    ],

    'cors' => [
        'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:3000')),
        'allowed_methods' => explode(',', env('CORS_ALLOWED_METHODS', 'GET,POST,PUT,DELETE,PATCH,OPTIONS')),
        'allowed_headers' => explode(',', env('CORS_ALLOWED_HEADERS', 'Content-Type,Authorization,X-Requested-With,Accept,Origin')),
    ],

];
