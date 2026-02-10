<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /*
    |--------------------------------------------------------------------------
    | Gestion de la redirection des utilisateurs authentifiés
    |--------------------------------------------------------------------------
    |
    | Ce middleware redirige les utilisateurs déjà authentifiés vers la page
    | d'accueil s'ils tentent d'accéder aux pages d'authentification.
    |
    */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (auth()->guard($guard)->check()) {
                return redirect(RouteServiceProvider::HOME);
            }
        }

        return $next($request);
    }
}
