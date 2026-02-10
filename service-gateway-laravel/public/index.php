<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

/*
|--------------------------------------------------------------------------
| Vérification de la maintenance de l'application
|--------------------------------------------------------------------------
|
| Déterminer si l'application est en mode maintenance et, si c'est le cas,
| charger le fichier de maintenance prédéfini pour que la requête soit
| envoyée vers cet écran au lieu de démarrer toute l'infrastructure.
|
*/

if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

/*
|--------------------------------------------------------------------------
| Enregistrement de l'autoloader Composer
|--------------------------------------------------------------------------
|
| Composer fournit un chargeur de classes automatique pratique pour cette
| application. Nous devons simplement l'utiliser. Nous allons simplement
| l'exiger dans le script ici afin que nous n'ayons pas à charger
| manuellement nos classes plus tard.
|
*/

require __DIR__.'/../vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Exécution de l'application
|--------------------------------------------------------------------------
|
| Une fois que nous avons l'application, nous pouvons gérer la requête
| entrante en utilisant le noyau HTTP de l'application. Ensuite, nous
| enverrons la réponse au navigateur et nous aurons terminé.
|
*/

$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Kernel::class);

$response = $kernel->handle(
    $request = Request::capture()
)->send();

$kernel->terminate($request, $response);
