<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /*
    |--------------------------------------------------------------------------
    | Mappage des politiques d'autorisation
    |--------------------------------------------------------------------------
    |
    | Cette propriété est utilisée pour mapper les modèles aux classes de
    | politique correspondantes. Cela permet de gérer l'autorisation pour
    | différents modèles de manière centralisée.
    |
    */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /*
    |--------------------------------------------------------------------------
    | Enregistrement des services d'authentification et d'autorisation
    |--------------------------------------------------------------------------
    |
    | Cette méthode est utilisée pour enregistrer tous les services
    | d'authentification et d'autorisation de votre application.
    |
    */
    public function boot(): void
    {
        //
    }
}
