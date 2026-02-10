package com.canteen.menu.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Classe singleton pour gérer le pool de connexions MySQL.
 * Utilise les variables d'environnement pour la configuration de la base de données.
 */
public class DatabaseConnection {
    
    // Instance unique du singleton
    private static DatabaseConnection instance;
    
    // Paramètres de connexion à la base de données
    private String dbHost;
    private String dbPort;
    private String dbName;
    private String dbUser;
    private String dbPassword;
    private String jdbcUrl;
    
    /**
     * Constructeur privé pour empêcher l'instanciation directe.
     * Initialise les paramètres de connexion depuis les variables d'environnement.
     */
    private DatabaseConnection() {
        // Récupération des variables d'environnement avec valeurs par défaut
        this.dbHost = System.getenv().getOrDefault("DB_HOST", "localhost");
        this.dbPort = System.getenv().getOrDefault("DB_PORT", "3306");
        this.dbName = System.getenv().getOrDefault("DB_NAME", "canteen_db");
        this.dbUser = System.getenv().getOrDefault("DB_USER", "root");
        this.dbPassword = System.getenv().getOrDefault("DB_PASSWORD", "");
        
        // Construction de l'URL JDBC
        this.jdbcUrl = String.format("jdbc:mysql://%s:%s/%s?useSSL=false&serverTimezone=UTC",
                this.dbHost, this.dbPort, this.dbName);
        
        // Chargement du driver MySQL
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("Erreur: Driver MySQL introuvable");
            e.printStackTrace();
        }
    }
    
    /**
     * Retourne l'instance unique de DatabaseConnection.
     * Crée l'instance si elle n'existe pas encore.
     * 
     * @return instance unique de DatabaseConnection
     */
    public static synchronized DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
    
    /**
     * Obtient une nouvelle connexion à la base de données.
     * 
     * @return objet Connection pour interagir avec la base de données
     * @throws SQLException si la connexion échoue
     */
    public Connection getConnection() throws SQLException {
        try {
            Connection conn = DriverManager.getConnection(jdbcUrl, dbUser, dbPassword);
            return conn;
        } catch (SQLException e) {
            System.err.println("Erreur lors de la connexion à la base de données");
            System.err.println("URL: " + jdbcUrl);
            System.err.println("User: " + dbUser);
            throw e;
        }
    }
    
    /**
     * Ferme une connexion à la base de données de manière sécurisée.
     * 
     * @param conn la connexion à fermer
     */
    public void closeConnection(Connection conn) {
        if (conn != null) {
            try {
                if (!conn.isClosed()) {
                    conn.close();
                }
            } catch (SQLException e) {
                System.err.println("Erreur lors de la fermeture de la connexion");
                e.printStackTrace();
            }
        }
    }
}
