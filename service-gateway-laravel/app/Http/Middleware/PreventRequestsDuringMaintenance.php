<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance as Middleware;

class PreventRequestsDuringMaintenance extends Middleware
{
    /**
     * Les URI qui doivent être accessibles pendant le mode maintenance.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
    ];
}
