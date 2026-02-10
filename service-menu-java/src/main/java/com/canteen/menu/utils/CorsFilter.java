package com.canteen.menu.utils;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Filtre CORS pour permettre les requetes cross-origin
 * Configure les en-têtes CORS pour autoriser tous les domaines en développement
 */
public class CorsFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialisation du filtre
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        // Autoriser toutes les origines
        httpResponse.setHeader("Access-Control-Allow-Origin", "*");
        
        // Autoriser toutes les méthodes HTTP
        httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH");
        
        // Autoriser tous les en-têtes
        httpResponse.setHeader("Access-Control-Allow-Headers", "*");
        
        // Continuer la chaine de filtres
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // Nettoyage des ressources
    }
}
