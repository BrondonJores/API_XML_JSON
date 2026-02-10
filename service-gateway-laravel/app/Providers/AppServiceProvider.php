<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /*
    |--------------------------------------------------------------------------
    | Enregistrement des services de l'application
    |--------------------------------------------------------------------------
    |
    | Cette méthode est utilisée pour enregistrer les liaisons de services
    | dans le conteneur. Toutes les liaisons doivent être effectuées ici.
    |
    */
    public function register(): void
    {
        //
    }

    /*
    |--------------------------------------------------------------------------
    | Démarrage des services de l'application
    |--------------------------------------------------------------------------
    |
    | Cette méthode est appelée après que tous les autres fournisseurs de
    | services ont été enregistrés. Vous avez accès à tous les services
    | enregistrés via le conteneur.
    |
    */
    public function boot(): void
    {
        //
    }
}
