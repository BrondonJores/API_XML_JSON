package com.canteen.menu.dao;

import com.canteen.menu.models.Category;
import com.canteen.menu.utils.DatabaseConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO pour la gestion des categories
 */
public class CategoryDAO {

    /**
     * Recupere toutes les categories
     * @return Liste des categories
     * @throws SQLException en cas d'erreur
     */
    public List<Category> findAll() throws SQLException {
        List<Category> categories = new ArrayList<>();
        String sql = "SELECT id, name, description FROM categories ORDER BY name";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                Category category = new Category(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("description")
                );
                categories.add(category);
            }
        }
        
        return categories;
    }

    /**
     * Recupere une categorie par son ID
     * @param id Identifiant de la categorie
     * @return Categorie trouvee ou null
     * @throws SQLException en cas d'erreur
     */
    public Category findById(int id) throws SQLException {
        String sql = "SELECT id, name, description FROM categories WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Category(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("description")
                    );
                }
            }
        }
        
        return null;
    }

    /**
     * Cree une nouvelle categorie
     * @param category Categorie a creer
     * @return ID de la categorie creee
     * @throws SQLException en cas d'erreur
     */
    public int create(Category category) throws SQLException {
        String sql = "INSERT INTO categories (name, description) VALUES (?, ?)";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setString(1, category.getName());
            stmt.setString(2, category.getDescription());
            
            stmt.executeUpdate();
            
            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    return generatedKeys.getInt(1);
                }
            }
        }
        
        throw new SQLException("Echec de la creation de la categorie");
    }

    /**
     * Met a jour une categorie existante
     * @param category Categorie a mettre a jour
     * @return true si la mise a jour a reussi
     * @throws SQLException en cas d'erreur
     */
    public boolean update(Category category) throws SQLException {
        String sql = "UPDATE categories SET name = ?, description = ? WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, category.getName());
            stmt.setString(2, category.getDescription());
            stmt.setInt(3, category.getId());
            
            return stmt.executeUpdate() > 0;
        }
    }

    /**
     * Supprime une categorie
     * @param id Identifiant de la categorie
     * @return true si la suppression a reussi
     * @throws SQLException en cas d'erreur
     */
    public boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM categories WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            
            return stmt.executeUpdate() > 0;
        }
    }
}
