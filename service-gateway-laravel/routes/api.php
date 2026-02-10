<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProxyController;

/*
|--------------------------------------------------------------------------
| Routes API
|--------------------------------------------------------------------------
|
| Vous pouvez enregistrer ici les routes API de votre application. Ces
| routes sont chargées par le RouteServiceProvider et sont assignées au
| groupe de middleware "api". Profitez-en pour construire votre API.
|
*/

// Route de santé - pas d'authentification requise
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'gateway',
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Routes d'authentification - pas d'authentification requise
Route::prefix('auth')->group(function () {
    // Inscription d'un nouvel utilisateur
    Route::post('/register', [AuthController::class, 'register']);
    
    // Connexion d'un utilisateur existant
    Route::post('/login', [AuthController::class, 'login']);
    
    // Routes protégées par authentification
    Route::middleware('auth:sanctum')->group(function () {
        // Déconnexion de l'utilisateur
        Route::post('/logout', [AuthController::class, 'logout']);
        
        // Récupération des informations de l'utilisateur
        Route::get('/me', [AuthController::class, 'me']);
    });
});

// Routes de profil - authentification requise
Route::middleware('auth:sanctum')->prefix('profile')->group(function () {
    // Récupération du profil utilisateur
    Route::get('/', [ProfileController::class, 'show']);
    
    // Mise à jour du profil utilisateur
    Route::put('/', [ProfileController::class, 'update']);
    
    // Gestion des allergies
    Route::post('/allergies', [ProfileController::class, 'manageAllergies']);
    
    // Gestion des préférences
    Route::post('/preferences', [ProfileController::class, 'managePreferences']);
});

// Routes de passerelle - authentification requise
Route::middleware('auth:sanctum')->prefix('gateway')->group(function () {
    // Proxy vers le service de menus (Java)
    Route::any('/meals/{path?}', [ProxyController::class, 'proxyMeals'])
        ->where('path', '.*');
    
    // Proxy vers le service de commandes (Python)
    Route::any('/orders/{path?}', [ProxyController::class, 'proxyOrders'])
        ->where('path', '.*');
});
