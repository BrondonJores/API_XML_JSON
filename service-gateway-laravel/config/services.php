<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Configuration des services tiers
    |--------------------------------------------------------------------------
    |
    | Ce fichier est destiné à stocker les informations d'identification
    | pour les services tiers tels que Mailgun, Postmark, AWS et plus encore.
    | Ce fichier fournit un emplacement de stockage raisonnable par défaut.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Configuration des microservices internes
    |--------------------------------------------------------------------------
    |
    | Cette section contient les URLs des microservices internes utilisés
    | par l'application gateway. Ces services sont appelés pour obtenir
    | des données spécifiques aux domaines métiers.
    |
    */

    'menu_service' => [
        'url' => env('MENU_SERVICE_URL', 'http://localhost:8080'),
        'timeout' => env('MENU_SERVICE_TIMEOUT', 30),
    ],

    'orders_service' => [
        'url' => env('ORDERS_SERVICE_URL', 'http://localhost:5000'),
        'timeout' => env('ORDERS_SERVICE_TIMEOUT', 30),
    ],

];
