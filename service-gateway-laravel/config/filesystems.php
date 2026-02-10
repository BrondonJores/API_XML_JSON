<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Configuration des systèmes de fichiers par défaut
    |--------------------------------------------------------------------------
    |
    | Ici vous pouvez spécifier le disque de système de fichiers par défaut
    | qui devrait être utilisé par le framework. Le disque "local", ainsi
    | que plusieurs disques basés sur le cloud, sont disponibles.
    |
    */

    'default' => env('FILESYSTEM_DISK', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Disques de système de fichiers
    |--------------------------------------------------------------------------
    |
    | Ici vous pouvez configurer autant de disques de système de fichiers
    | que vous le souhaitez, et vous pouvez même configurer plusieurs disques
    | du même pilote.
    |
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
            'throw' => false,
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
            'throw' => false,
        ],

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
            'throw' => false,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Liens symboliques
    |--------------------------------------------------------------------------
    |
    | Ici vous pouvez configurer les liens symboliques qui seront créés
    | lorsque la commande Artisan `storage:link` est exécutée.
    |
    */

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];
