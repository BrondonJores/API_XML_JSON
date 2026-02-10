<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Configuration de hachage par défaut
    |--------------------------------------------------------------------------
    |
    | Ici vous pouvez spécifier l'algorithme de hachage par défaut qui
    | devrait être utilisé par le framework. Par défaut, l'algorithme
    | bcrypt est utilisé.
    |
    */

    'driver' => 'bcrypt',

    /*
    |--------------------------------------------------------------------------
    | Options Bcrypt
    |--------------------------------------------------------------------------
    |
    | Ici vous pouvez spécifier les options de configuration pour le hacheur
    | bcrypt, ce qui vous permettra de contrôler le coût de calcul utilisé
    | par l'algorithme. La valeur par défaut devrait être appropriée.
    |
    */

    'bcrypt' => [
        'rounds' => env('BCRYPT_ROUNDS', 10),
    ],

    /*
    |--------------------------------------------------------------------------
    | Options Argon
    |--------------------------------------------------------------------------
    |
    | Ici vous pouvez spécifier les options de configuration pour le hacheur
    | argon, ce qui vous permettra de contrôler le coût de calcul utilisé
    | par l'algorithme.
    |
    */

    'argon' => [
        'memory' => 65536,
        'threads' => 1,
        'time' => 4,
    ],

];
