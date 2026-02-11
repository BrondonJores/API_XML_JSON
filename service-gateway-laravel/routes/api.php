<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProxyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Routes API
|--------------------------------------------------------------------------
|
| Ici vous pouvez enregistrer les routes API pour votre application.
| Ces routes sont chargées par le RouteServiceProvider dans le groupe
| "api" qui applique le middleware "api" à ces routes.
|
*/

// Routes publiques
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'service' => 'gateway']);
});

// Routes protégées par Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/allergies', [ProfileController::class, 'updateAllergies']);
    Route::post('/profile/preferences', [ProfileController::class, 'updatePreferences']);
    
    Route::any('/gateway/menu/{path}', [ProxyController::class, 'proxyToMenu'])->where('path', '.*');
    Route::any('/gateway/orders/{path}', [ProxyController::class, 'proxyToOrders'])->where('path', '.*');
});

