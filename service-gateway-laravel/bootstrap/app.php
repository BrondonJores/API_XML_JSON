<?php

/*
|--------------------------------------------------------------------------
| Création de l'application
|--------------------------------------------------------------------------
|
| La première chose que nous allons faire est de créer une nouvelle instance
| de l'application Laravel qui sert de "colle" pour tous les composants
| et constitue le conteneur IoC pour le système.
|
*/

$app = new Illuminate\Foundation\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);

/*
|--------------------------------------------------------------------------
| Liaison des interfaces importantes
|--------------------------------------------------------------------------
|
| Ensuite, nous devons lier certaines interfaces importantes dans le conteneur
| afin de pouvoir les résoudre lorsque nécessaire. Les noyaux servent les
| requêtes entrantes vers cette application depuis le web et la CLI.
|
*/

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

/*
|--------------------------------------------------------------------------
| Retour de l'application
|--------------------------------------------------------------------------
|
| Ce script retourne l'instance de l'application. L'instance est donnée
| au script appelant afin que nous puissions séparer la construction de
| l'instance de l'exécution réelle de l'application.
|
*/

return $app;
