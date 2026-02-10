<?php

namespace App\Http\Controllers;

use App\Services\MenuClient;
use App\Services\OrderClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProxyController extends Controller
{
    public function __construct(
        private MenuClient $menuClient,
        private OrderClient $orderClient
    ) {
    }

    public function proxyToMenu(Request $request, string $path = ''): JsonResponse
    {
        try {
            $response = $this->menuClient->proxy(
                $request->method(),
                $path,
                $request->all(),
                $request->header('Authorization')
            );

            return response()->json($response['body'], $response['status']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la communication avec le service de menus',
                'error' => $e->getMessage()
            ], 502);
        }
    }

    public function proxyToOrders(Request $request, string $path = ''): JsonResponse
    {
        try {
            $user = $request->user();
            
            $response = $this->orderClient->proxy(
                $request->method(),
                $path,
                $request->all(),
                $user ? $user->id : null
            );

            return response()->json($response['body'], $response['status']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la communication avec le service de commandes',
                'error' => $e->getMessage()
            ], 502);
        }
    }
}
