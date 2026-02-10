<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Guards d'authentification par défaut
    |--------------------------------------------------------------------------
    |
    | Cette option contrôle le guard d'authentification par défaut et les
    | options de réinitialisation de mot de passe pour votre application.
    |
    */

    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    /*
    |--------------------------------------------------------------------------
    | Guards d'authentification
    |--------------------------------------------------------------------------
    |
    | Ici vous pouvez définir chaque guard d'authentification pour votre
    | application. Une excellente configuration par défaut a été définie
    | pour vous qui utilise le stockage de session et le provider Eloquent.
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Providers d'utilisateurs
    |--------------------------------------------------------------------------
    |
    | Tous les guards d'authentification ont un provider d'utilisateurs.
    | Cela définit comment les utilisateurs sont réellement récupérés de
    | votre base de données ou d'autres mécanismes de stockage.
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Réinitialisation des mots de passe
    |--------------------------------------------------------------------------
    |
    | Vous pouvez spécifier plusieurs configurations de réinitialisation de
    | mot de passe si vous avez plus d'une table d'utilisateurs ou modèles
    | dans l'application et que vous voulez avoir des paramètres séparés.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Délai d'expiration de confirmation du mot de passe
    |--------------------------------------------------------------------------
    |
    | Ici vous pouvez définir la durée en secondes avant qu'une confirmation
    | de mot de passe expire et que l'utilisateur soit invité à entrer à
    | nouveau son mot de passe via l'écran de confirmation.
    |
    */

    'password_timeout' => 10800,

];
