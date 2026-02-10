<?php

use Illuminate\Support\Facades\Facade;
use Illuminate\Support\ServiceProvider;

return [

    /*
    |--------------------------------------------------------------------------
    | Nom de l'application
    |--------------------------------------------------------------------------
    |
    | Cette valeur est le nom de votre application. Elle est utilisée lorsque
    | le framework doit placer le nom de l'application dans une notification
    | ou tout autre emplacement requis par l'application ou ses packages.
    |
    */

    'name' => env('APP_NAME', 'Laravel'),

    /*
    |--------------------------------------------------------------------------
    | Environnement de l'application
    |--------------------------------------------------------------------------
    |
    | Cette valeur détermine l'environnement dans lequel votre application
    | s'exécute actuellement. Cela peut déterminer comment vous préférez
    | configurer divers services que l'application utilise.
    |
    */

    'env' => env('APP_ENV', 'production'),

    /*
    |--------------------------------------------------------------------------
    | Mode de débogage de l'application
    |--------------------------------------------------------------------------
    |
    | Lorsque votre application est en mode débogage, des messages d'erreur
    | détaillés avec des traces de pile seront affichés pour chaque erreur.
    | Si désactivé, une simple page d'erreur générique est affichée.
    |
    */

    'debug' => (bool) env('APP_DEBUG', false),

    /*
    |--------------------------------------------------------------------------
    | URL de l'application
    |--------------------------------------------------------------------------
    |
    | Cette URL est utilisée par la console pour générer correctement les URLs
    | lors de l'utilisation de l'outil en ligne de commande Artisan. Vous
    | devez définir cela à la racine de votre application.
    |
    */

    'url' => env('APP_URL', 'http://localhost'),

    'asset_url' => env('ASSET_URL'),

    /*
    |--------------------------------------------------------------------------
    | Fuseau horaire de l'application
    |--------------------------------------------------------------------------
    |
    | Vous pouvez spécifier ici le fuseau horaire par défaut pour votre
    | application, qui sera utilisé par les fonctions de date et d'heure PHP.
    |
    */

    'timezone' => 'UTC',

    /*
    |--------------------------------------------------------------------------
    | Configuration de la locale de l'application
    |--------------------------------------------------------------------------
    |
    | La locale de l'application détermine la locale par défaut qui sera
    | utilisée par le fournisseur de services de traduction. Vous êtes libre
    | de définir cette valeur à n'importe quelle locale supportée.
    |
    */

    'locale' => 'fr',

    'fallback_locale' => 'en',

    'faker_locale' => 'fr_FR',

    /*
    |--------------------------------------------------------------------------
    | Clé de chiffrement
    |--------------------------------------------------------------------------
    |
    | Cette clé est utilisée par le service de chiffrement Illuminate et doit
    | être définie sur une chaîne aléatoire de 32 caractères, sinon ces
    | chaînes chiffrées ne seront pas sécurisées.
    |
    */

    'key' => env('APP_KEY'),

    'cipher' => 'AES-256-CBC',

    /*
    |--------------------------------------------------------------------------
    | Pilote du gestionnaire de maintenance
    |--------------------------------------------------------------------------
    |
    | Ces options de configuration déterminent le pilote utilisé pour
    | déterminer et gérer l'état de maintenance de Laravel. Le pilote "file"
    | stockera l'état de maintenance dans un fichier simple.
    |
    */

    'maintenance' => [
        'driver' => 'file',
    ],

    /*
    |--------------------------------------------------------------------------
    | Fournisseurs de services chargés automatiquement
    |--------------------------------------------------------------------------
    |
    | Les fournisseurs de services listés ici seront automatiquement chargés
    | lors de la requête vers votre application. N'hésitez pas à ajouter vos
    | propres services à ce tableau pour accorder des fonctionnalités étendues.
    |
    */

    'providers' => ServiceProvider::defaultProviders()->merge([
        /*
         * Fournisseurs de services de package
         */

        /*
         * Fournisseurs de services de l'application
         */
        App\Providers\AppServiceProvider::class,
        App\Providers\AuthServiceProvider::class,
        App\Providers\RouteServiceProvider::class,
    ])->toArray(),

    /*
    |--------------------------------------------------------------------------
    | Alias de classe
    |--------------------------------------------------------------------------
    |
    | Ce tableau d'alias de classes sera enregistré lorsque cette application
    | démarrera. Vous pouvez ajouter autant d'alias que vous le souhaitez à
    | ce tableau, car ils seront chargés paresseusement.
    |
    */

    'aliases' => Facade::defaultAliases()->merge([
        // 'Example' => App\Facades\Example::class,
    ])->toArray(),

];
