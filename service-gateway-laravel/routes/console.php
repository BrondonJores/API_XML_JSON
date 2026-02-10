<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Routes de console
|--------------------------------------------------------------------------
|
| Ce fichier contient toutes les commandes console personnalisées basées
| sur des closures. Chaque closure est liée à une instance de commande
| permettant une approche simple pour interagir avec les méthodes IO.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Afficher une citation inspirante');
