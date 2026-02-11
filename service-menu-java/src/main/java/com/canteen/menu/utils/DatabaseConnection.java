package com.canteen.menu.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Classe utilitaire pour gerer la connexion securisee a la base de donnees MySQL
 * Utilise exclusivement des variables d'environnement pour les credentials
 */
public class DatabaseConnection {
    
    private static final String DB_HOST = System.getenv("DB_HOST");
    private static final String DB_PORT = System.getenv("DB_PORT");
    private static final String DB_NAME = System.getenv("DB_NAME");
    private static final String DB_USER = System.getenv("DB_USER");
    private static final String DB_PASSWORD = System.getenv("DB_PASSWORD");
    
    // Option SSL: utiliser useSSL=true en production avec des certificats configures
    private static final String USE_SSL = System.getenv().getOrDefault("DB_USE_SSL", "false");
    
    private static final String DB_URL;
    
    static {
        // Validation des variables d'environnement requises
        if (DB_HOST == null || DB_PORT == null || DB_NAME == null || 
            DB_USER == null || DB_PASSWORD == null) {
            throw new RuntimeException(
                "Variables d'environnement manquantes pour la connexion DB. " +
                "Requis: DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD"
            );
        }
        
        // Construction de l'URL avec options de securite
        DB_URL = "jdbc:mysql://" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME 
                + "?useSSL=" + USE_SSL
                + "&serverTimezone=UTC"
                + "&allowPublicKeyRetrieval=true"
                + "&requireSSL=" + USE_SSL;
        
        try {
            // Charger le driver MySQL
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("Erreur lors du chargement du driver MySQL", e);
        }
    }
    
    /**
     * Obtenir une connexion securisee a la base de donnees
     * @return Connection
     * @throws SQLException
     */
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
    }
    
    /**
     * Fermer une connexion de maniere securisee
     * @param connection La connexion a fermer
     */
    public static void closeConnection(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                System.err.println("Erreur lors de la fermeture de la connexion: " + e.getMessage());
            }
        }
    }
    
    /**
     * Tester la connexion a la base de donnees
     * @return true si la connexion reussit, false sinon
     */
    public static boolean testConnection() {
        try (Connection conn = getConnection()) {
            return conn != null && !conn.isClosed();
        } catch (SQLException e) {
            System.err.println("Erreur de connexion a la base de donnees: " + e.getMessage());
            return false;
        }
    }
}
