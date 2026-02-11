package com.canteen.menu.filters;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * Filtre pour ajouter les headers de securite HTTP
 * Protege contre diverses attaques web (XSS, Clickjacking, MIME sniffing, etc.)
 */
public class SecurityHeadersFilter implements Filter {
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        // Prevenir le MIME type sniffing
        httpResponse.setHeader("X-Content-Type-Options", "nosniff");
        
        // Proteger contre le clickjacking
        httpResponse.setHeader("X-Frame-Options", "DENY");
        
        // Activer la protection XSS du navigateur
        httpResponse.setHeader("X-XSS-Protection", "1; mode=block");
        
        // Forcer HTTPS (activer en production uniquement)
        // httpResponse.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
        
        // Content Security Policy - Restreindre les sources de contenu
        httpResponse.setHeader("Content-Security-Policy", "default-src 'self'");
        
        // Controler les informations envoyees dans le header Referrer
        httpResponse.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
        
        // Desactiver les features du navigateur non utilisees
        httpResponse.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
        
        chain.doFilter(request, response);
    }
    
    @Override
    public void destroy() {
    }
}
