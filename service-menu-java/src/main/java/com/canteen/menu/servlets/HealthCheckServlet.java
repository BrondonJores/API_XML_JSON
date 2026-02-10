package com.canteen.menu.servlets;

import com.canteen.menu.services.JsonService;
import com.canteen.menu.utils.DatabaseConnection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

/**
 * Servlet pour verifier l'etat de sante de l'application
 * Verifie la connexion a la base de donnees et retourne le statut
 */
@WebServlet("/api/health")
public class HealthCheckServlet extends HttpServlet {
    
    private JsonService jsonService;
    
    @Override
    public void init() throws ServletException {
        this.jsonService = new JsonService();
    }
    
    /**
     * Gestion des requetes GET pour le health check
     * GET /api/health - retourne l'etat de sante de l'application
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        Map<String, Object> healthStatus = new HashMap<>();
        boolean isDatabaseConnected = checkDatabaseConnection();
        
        if (isDatabaseConnected) {
            healthStatus.put("status", "healthy");
            healthStatus.put("database", "connected");
            healthStatus.put("timestamp", Instant.now().toString());
            
            sendJsonResponse(response, HttpServletResponse.SC_OK, healthStatus);
        } else {
            healthStatus.put("status", "unhealthy");
            healthStatus.put("database", "disconnected");
            healthStatus.put("timestamp", Instant.now().toString());
            
            sendJsonResponse(response, HttpServletResponse.SC_SERVICE_UNAVAILABLE, healthStatus);
        }
    }
    
    /**
     * Verifie la connexion a la base de donnees
     * 
     * @return true si la connexion est etablie, false sinon
     */
    private boolean checkDatabaseConnection() {
        Connection conn = null;
        try {
            conn = DatabaseConnection.getInstance().getConnection();
            return conn != null && !conn.isClosed();
        } catch (SQLException e) {
            System.err.println("Erreur de connexion a la base de donnees: " + e.getMessage());
            return false;
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    System.err.println("Erreur lors de la fermeture de la connexion: " + e.getMessage());
                }
            }
        }
    }
    
    /**
     * Envoie une reponse JSON au client
     */
    private void sendJsonResponse(HttpServletResponse response, int status, Map<String, Object> data) 
            throws IOException {
        
        String jsonResponse = jsonService.toJson(data);
        
        response.setContentType("application/json; charset=UTF-8");
        response.setStatus(status);
        response.getWriter().write(jsonResponse);
    }
}
