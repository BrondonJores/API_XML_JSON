<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Routes de console
|--------------------------------------------------------------------------
|
| Ce fichier est l'endroit où vous pouvez définir toutes vos commandes
| de console basées sur une Closure. Chaque Closure est liée à une
| instance de commande permettant une approche simple d'interaction.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Afficher une citation inspirante');
