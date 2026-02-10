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

// Routes d'authentification publiques
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

// Routes d'authentification protégées
Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
});

// Routes de profil utilisateur
Route::middleware('auth:sanctum')->prefix('profile')->group(function () {
    Route::get('/', [ProfileController::class, 'show']);
    Route::put('/', [ProfileController::class, 'update']);
    
    // Gestion des allergies
    Route::post('allergies', [ProfileController::class, 'addAllergy']);
    Route::delete('allergies/{id}', [ProfileController::class, 'removeAllergy']);
    
    // Gestion des préférences
    Route::post('preferences', [ProfileController::class, 'addPreference']);
    Route::delete('preferences/{id}', [ProfileController::class, 'removePreference']);
});

// Routes proxy vers le service Menu
Route::middleware('auth:sanctum')->prefix('menu')->group(function () {
    Route::any('{path?}', [ProxyController::class, 'proxyMenu'])->where('path', '.*');
});

// Routes proxy vers le service Orders
Route::middleware('auth:sanctum')->prefix('orders')->group(function () {
    Route::any('{path?}', [ProxyController::class, 'proxyOrders'])->where('path', '.*');
});

// Route de vérification de santé
Route::get('health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'gateway',
        'timestamp' => now()->toIso8601String(),
    ]);
});
