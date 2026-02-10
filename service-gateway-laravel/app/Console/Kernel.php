<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /*
    |--------------------------------------------------------------------------
    | Commandes Artisan de l'application
    |--------------------------------------------------------------------------
    |
    | Cette propriété vous permet d'enregistrer les commandes console personnalisées
    | de votre application. Elles seront automatiquement chargées.
    |
    */
    protected $commands = [];

    /*
    |--------------------------------------------------------------------------
    | Définition de la planification des commandes
    |--------------------------------------------------------------------------
    |
    | Cette méthode vous permet de définir toutes les tâches planifiées pour
    | votre application. Les tâches sont définies en utilisant une interface
    | fluide et expressive fournie par Laravel.
    |
    */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
    }

    /*
    |--------------------------------------------------------------------------
    | Enregistrement des commandes pour l'application
    |--------------------------------------------------------------------------
    |
    | Cette méthode est utilisée pour enregistrer vos commandes console. Vous
    | pouvez charger des commandes depuis un répertoire ou les définir manuellement.
    |
    */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
