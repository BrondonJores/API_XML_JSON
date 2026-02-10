<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /*
    |--------------------------------------------------------------------------
    | Chemin de redirection après authentification
    |--------------------------------------------------------------------------
    |
    | C'est le chemin vers lequel les utilisateurs seront redirigés après
    | s'être connectés à l'application. En général, ce sera votre tableau
    | de bord ou page d'accueil.
    |
    */
    public const HOME = '/home';

    /*
    |--------------------------------------------------------------------------
    | Définition des routes de l'application
    |--------------------------------------------------------------------------
    |
    | Cette méthode est utilisée pour définir toutes les routes de votre
    | application. Les routes sont chargées par le RouteServiceProvider et
    | sont attribuées au groupe de middleware "web" ou "api".
    |
    */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}
