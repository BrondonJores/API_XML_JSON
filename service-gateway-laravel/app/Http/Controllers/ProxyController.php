<?php

namespace App\Http\Controllers;

use App\Services\MenuClient;
use App\Services\OrderClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProxyController extends Controller
{
    protected MenuClient $menuClient;
    protected OrderClient $orderClient;

    public function __construct(MenuClient $menuClient, OrderClient $orderClient)
    {
        $this->menuClient = $menuClient;
        $this->orderClient = $orderClient;
    }

    /**
     * Proxy vers le service Menu.
     *
     * @param Request $request
     * @param string $path
     * @return JsonResponse
     */
    public function proxyToMenu(Request $request, string $path = ''): JsonResponse
    {
        $method = $request->method();
        $user = $request->user();

        // Journaliser la requête
        $this->logApiRequest('menu', $method, $path, $user?->id);

        // Préparer les en-têtes
        $headers = [
            'Accept' => $request->header('Accept', 'application/json'),
            'Content-Type' => 'application/json',
        ];

        // Ajouter les informations utilisateur dans les en-têtes
        if ($user) {
            $headers['X-User-Id'] = $user->id;
            $headers['X-User-Email'] = $user->email;
            $headers['X-User-Role'] = $user->role ?? 'user';
        }

        // Effectuer la requête selon la méthode HTTP
        $result = match ($method) {
            'GET' => $this->menuClient->get($path, $request->query(), $headers),
            'POST' => $this->menuClient->post($path, $request->all(), $headers),
            'PUT', 'PATCH' => $this->menuClient->put($path, $request->all(), $headers),
            'DELETE' => $this->menuClient->delete($path, $headers),
            default => [
                'status' => 405,
                'body' => ['error' => 'Méthode non autorisée'],
                'headers' => [],
            ],
        };

        // Retourner la réponse
        return response()->json($result['body'], $result['status']);
    }

    /**
     * Proxy vers le service Orders.
     *
     * @param Request $request
     * @param string $path
     * @return JsonResponse
     */
    public function proxyToOrders(Request $request, string $path = ''): JsonResponse
    {
        $method = $request->method();
        $user = $request->user();

        // Journaliser la requête
        $this->logApiRequest('orders', $method, $path, $user?->id);

        // Préparer les en-têtes
        $headers = [
            'Accept' => $request->header('Accept', 'application/json'),
            'Content-Type' => 'application/json',
        ];

        // Ajouter les informations utilisateur dans les en-têtes
        if ($user) {
            $headers['X-User-Id'] = $user->id;
            $headers['X-User-Email'] = $user->email;
            $headers['X-User-Role'] = $user->role ?? 'user';
        }

        // Effectuer la requête selon la méthode HTTP
        $result = match ($method) {
            'GET' => $this->orderClient->get($path, $request->query(), $headers),
            'POST' => $this->orderClient->post($path, $request->all(), $headers),
            'PUT', 'PATCH' => $this->orderClient->put($path, $request->all(), $headers),
            'DELETE' => $this->orderClient->delete($path, $headers),
            default => [
                'status' => 405,
                'body' => ['error' => 'Méthode non autorisée'],
                'headers' => [],
            ],
        };

        // Retourner la réponse
        return response()->json($result['body'], $result['status']);
    }

    /**
     * Journaliser une requête API.
     *
     * @param string $service
     * @param string $method
     * @param string $path
     * @param int|null $userId
     * @return void
     */
    protected function logApiRequest(string $service, string $method, string $path, ?int $userId): void
    {
        try {
            DB::table('api_logs')->insert([
                'user_id' => $userId,
                'service' => $service,
                'method' => $method,
                'path' => $path,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la journalisation de la requête API', [
                'error' => $e->getMessage(),
            ]);
        }
    }
}
