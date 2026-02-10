<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class HealthController extends Controller
{
    /**
     * Vérification de l'état de santé du service
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function check()
    {
        try {
            // Vérification de la connexion à la base de données
            DB::connection()->getPdo();
            $databaseStatus = 'connected';
            $databaseMessage = 'Connexion à la base de données établie';
        } catch (\Exception $e) {
            $databaseStatus = 'disconnected';
            $databaseMessage = 'Erreur de connexion à la base de données: ' . $e->getMessage();
        }

        // Détermination du statut global
        $overallStatus = $databaseStatus === 'connected' ? 'healthy' : 'unhealthy';
        $statusCode = $overallStatus === 'healthy' ? 200 : 503;

        return response()->json([
            'status' => $overallStatus,
            'service' => 'gateway-laravel',
            'timestamp' => now()->toIso8601String(),
            'checks' => [
                'database' => [
                    'status' => $databaseStatus,
                    'message' => $databaseMessage,
                ],
            ],
        ], $statusCode);
    }
}
