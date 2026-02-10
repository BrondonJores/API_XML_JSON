<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Service Gateway API',
        'version' => '1.0.0'
    ]);
});
