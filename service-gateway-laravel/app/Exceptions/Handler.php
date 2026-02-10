<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /*
    |--------------------------------------------------------------------------
    | Liste des entrées d'exclusion pour le reporting
    |--------------------------------------------------------------------------
    |
    | Cette liste contient les types d'exception qui ne sont pas signalés.
    | Cependant, vous pouvez toujours les personnaliser selon vos besoins.
    |
    */
    protected $dontReport = [];

    /*
    |--------------------------------------------------------------------------
    | Liste des entrées à ne pas flasher
    |--------------------------------------------------------------------------
    |
    | Ce sont les clés d'entrée qui ne doivent jamais être flashées pour
    | les exceptions de validation dans la session.
    |
    */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /*
    |--------------------------------------------------------------------------
    | Enregistrement des callbacks de gestion des exceptions
    |--------------------------------------------------------------------------
    |
    | Vous pouvez enregistrer des callbacks de reporting et de rendu personnalisés
    | pour les exceptions. Cela vous permet de personnaliser la façon dont ces
    | exceptions sont signalées et rendues par l'application.
    |
    */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
