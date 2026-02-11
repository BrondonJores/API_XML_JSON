<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Handle an incoming request and add security headers.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        
        // Prevenir le MIME type sniffing
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        
        // Proteger contre le clickjacking
        $response->headers->set('X-Frame-Options', 'DENY');
        
        // Activer la protection XSS du navigateur
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        
        // Forcer HTTPS (activer en production uniquement)
        // $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        
        // Content Security Policy - Restreindre les sources de contenu
        $response->headers->set('Content-Security-Policy', "default-src 'self'");
        
        // Controler les informations envoyees dans le header Referrer
        $response->headers->set('Referrer-Policy', 'no-referrer-when-downgrade');
        
        // Desactiver les features du navigateur non utilisees
        $response->headers->set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
        
        return $response;
    }
}
