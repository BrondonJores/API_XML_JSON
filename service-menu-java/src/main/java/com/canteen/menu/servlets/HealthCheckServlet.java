package com.canteen.menu.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.canteen.menu.utils.DatabaseConnection;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * Servlet pour le health check du service
 * Endpoint: GET /api/health
 * Retourne le statut du service et de la base de donnees
 */
@WebServlet("/api/health")
public class HealthCheckServlet extends HttpServlet {
    
    /**
     * GET - Verifier la sante du service
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        
        boolean dbHealthy = checkDatabaseConnection();
        String status = dbHealthy ? "UP" : "DOWN";
        int httpStatus = dbHealthy ? HttpServletResponse.SC_OK : HttpServletResponse.SC_SERVICE_UNAVAILABLE;
        
        response.setStatus(httpStatus);
        
        PrintWriter out = response.getWriter();
        StringBuilder json = new StringBuilder();
        json.append("{\n");
        json.append("  \"status\": \"").append(status).append("\",\n");
        json.append("  \"service\": \"menu-service-java\",\n");
        json.append("  \"version\": \"1.0.0\",\n");
        json.append("  \"database\": {\n");
        json.append("    \"status\": \"").append(dbHealthy ? "UP" : "DOWN").append("\"\n");
        json.append("  },\n");
        json.append("  \"timestamp\": \"").append(java.time.Instant.now().toString()).append("\"\n");
        json.append("}");
        
        out.print(json.toString());
        out.flush();
    }
    
    /**
     * Verifier la connexion a la base de donnees
     */
    private boolean checkDatabaseConnection() {
        try (Connection conn = DatabaseConnection.getConnection()) {
            return conn != null && !conn.isClosed();
        } catch (SQLException e) {
            System.err.println("Erreur de connexion a la base de donnees: " + e.getMessage());
            return false;
        }
    }
}
