package com.canteen.menu.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Classe utilitaire pour gerer les connexions a la base de donnees MySQL
 */
public class DatabaseConnection {
    private static String dbHost;
    private static String dbPort;
    private static String dbName;
    private static String dbUser;
    private static String dbPassword;
    private static String jdbcUrl;

    static {
        // Recuperation des variables d'environnement
        dbHost = System.getenv("DB_HOST");
        dbPort = System.getenv("DB_PORT");
        dbName = System.getenv("DB_NAME");
        dbUser = System.getenv("DB_USER");
        dbPassword = System.getenv("DB_PASSWORD");

        // Valeurs par defaut si les variables ne sont pas definies
        if (dbHost == null) dbHost = "mysql-menu";
        if (dbPort == null) dbPort = "3306";
        if (dbName == null) dbName = "canteen_menu";
        if (dbUser == null) dbUser = "root";
        if (dbPassword == null) dbPassword = "root";

        jdbcUrl = String.format("jdbc:mysql://%s:%s/%s?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true",
                dbHost, dbPort, dbName);

        try {
            // Chargement du driver MySQL
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("Driver MySQL non trouve", e);
        }
    }

    /**
     * Obtient une connexion a la base de donnees
     * @return Connexion SQL
     * @throws SQLException en cas d'erreur de connexion
     */
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(jdbcUrl, dbUser, dbPassword);
    }

    /**
     * Ferme proprement une connexion
     * @param connection Connexion a fermer
     */
    public static void closeConnection(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
