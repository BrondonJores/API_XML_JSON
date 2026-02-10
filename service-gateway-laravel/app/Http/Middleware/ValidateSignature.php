<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\ValidateSignature as Middleware;

class ValidateSignature extends Middleware
{
    /**
     * Les noms des paramètres de requête qui doivent être ignorés.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
    ];
}
