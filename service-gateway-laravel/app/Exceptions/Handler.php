<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * Une liste des types d'exception qui ne sont pas rapportés.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * Une liste des entrées qui ne sont jamais flashées à la session en cas d'erreur de validation.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Enregistrer les callbacks de gestion des exceptions pour l'application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
        
        // Gestion personnalisee des erreurs pour l'API
        $this->renderable(function (Throwable $e, $request) {
            if ($request->is('api/*')) {
                // Ne pas exposer les details d'erreur en production
                if (config('app.env') === 'production') {
                    $statusCode = method_exists($e, 'getStatusCode') ? $e->getStatusCode() : 500;
                    
                    // Messages generiques selon le code d'erreur
                    $messages = [
                        404 => 'Ressource non trouvee',
                        401 => 'Non authentifie',
                        403 => 'Acces interdit',
                        422 => 'Donnees de validation invalides',
                        500 => 'Une erreur interne est survenue',
                    ];
                    
                    return response()->json([
                        'message' => $messages[$statusCode] ?? 'Une erreur est survenue',
                    ], $statusCode);
                }
            }
        });
    }
}
