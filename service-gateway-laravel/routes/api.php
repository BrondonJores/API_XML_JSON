<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProxyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'gateway',
        'timestamp' => now()->toIso8601String()
    ]);
});

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

Route::middleware('auth:sanctum')->prefix('profile')->group(function () {
    Route::get('/', [ProfileController::class, 'show']);
    Route::put('/', [ProfileController::class, 'update']);
    Route::post('/allergies', [ProfileController::class, 'updateAllergies']);
    Route::post('/preferences', [ProfileController::class, 'updatePreferences']);
});

Route::prefix('gateway')->group(function () {
    Route::any('/meals/{path?}', [ProxyController::class, 'proxyToMenu'])
        ->where('path', '.*')
        ->middleware('auth:sanctum');
    
    Route::any('/orders/{path?}', [ProxyController::class, 'proxyToOrders'])
        ->where('path', '.*')
        ->middleware('auth:sanctum');
});

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
});
