<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Configuration des files d'attente par défaut
    |--------------------------------------------------------------------------
    |
    | Voici où vous pouvez configurer la connexion par défaut et le nom de
    | file d'attente pour toutes les opérations de file d'attente.
    |
    */

    'default' => env('QUEUE_CONNECTION', 'sync'),

    /*
    |--------------------------------------------------------------------------
    | Connexions de file d'attente
    |--------------------------------------------------------------------------
    |
    | Ici vous pouvez configurer les informations de connexion pour chaque
    | serveur de file d'attente utilisé par votre application.
    |
    */

    'connections' => [

        'sync' => [
            'driver' => 'sync',
        ],

        'database' => [
            'driver' => 'database',
            'table' => 'jobs',
            'queue' => 'default',
            'retry_after' => 90,
            'after_commit' => false,
        ],

        'beanstalkd' => [
            'driver' => 'beanstalkd',
            'host' => 'localhost',
            'queue' => 'default',
            'retry_after' => 90,
            'block_for' => 0,
            'after_commit' => false,
        ],

        'sqs' => [
            'driver' => 'sqs',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'prefix' => env('SQS_PREFIX', 'https://sqs.us-east-1.amazonaws.com/your-account-id'),
            'queue' => env('SQS_QUEUE', 'default'),
            'suffix' => env('SQS_SUFFIX'),
            'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
            'after_commit' => false,
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
            'queue' => env('REDIS_QUEUE', 'default'),
            'retry_after' => 90,
            'block_for' => null,
            'after_commit' => false,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Écouteurs de tâches échouées
    |--------------------------------------------------------------------------
    |
    | Ces options de configuration permettent de contrôler le comportement
    | du logger de tâches échouées afin que vous puissiez contrôler quelles
    | bases de données et tables sont utilisées pour stocker les tâches.
    |
    */

    'failed' => [
        'driver' => env('QUEUE_FAILED_DRIVER', 'database-uuids'),
        'database' => env('DB_CONNECTION', 'mysql'),
        'table' => 'failed_jobs',
    ],

];
