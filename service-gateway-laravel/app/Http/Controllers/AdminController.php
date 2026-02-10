<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{
    public function dashboard(): JsonResponse
    {
        return response()->json([
            'message' => 'Tableau de bord administrateur',
            'timestamp' => now()->toIso8601String()
        ]);
    }
}
