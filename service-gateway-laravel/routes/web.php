<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Routes Web
|--------------------------------------------------------------------------
|
| Vous pouvez enregistrer ici les routes web de votre application. Ces
| routes sont chargées par le RouteServiceProvider et sont assignées au
| groupe de middleware "web". Profitez-en pour construire votre interface.
|
*/

Route::get('/', function () {
    return response()->json([
        'message' => 'Service Gateway Laravel - API d\'authentification et passerelle',
        'version' => '1.0.0',
    ]);
});
