package com.canteen.menu.dao;

import com.canteen.menu.models.Category;
import com.canteen.menu.utils.DatabaseConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO pour la gestion des categories dans la base de donnees
 * Utilise PreparedStatement pour prevenir les injections SQL
 */
public class CategoryDAO {
    
    /**
     * Recuperer toutes les categories
     * @return Liste de toutes les categories
     * @throws SQLException En cas d'erreur SQL
     */
    public List<Category> getAllCategories() throws SQLException {
        List<Category> categories = new ArrayList<>();
        String sql = "SELECT * FROM categories ORDER BY id";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                categories.add(extractCategoryFromResultSet(rs));
            }
        }
        
        return categories;
    }
    
    /**
     * Recuperer une categorie par son identifiant
     * @param id Identifiant de la categorie
     * @return La categorie trouvee ou null si inexistante
     * @throws SQLException En cas d'erreur SQL
     */
    public Category getCategoryById(int id) throws SQLException {
        String sql = "SELECT * FROM categories WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return extractCategoryFromResultSet(rs);
                }
            }
        }
        
        return null;
    }
    
    /**
     * Creer une nouvelle categorie
     * @param category La categorie a creer
     * @return La categorie creee avec son identifiant genere
     * @throws SQLException En cas d'erreur SQL
     */
    public Category createCategory(Category category) throws SQLException {
        String sql = "INSERT INTO categories (name, description) VALUES (?, ?)";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setString(1, category.getName());
            stmt.setString(2, category.getDescription());
            
            int affectedRows = stmt.executeUpdate();
            
            if (affectedRows == 0) {
                throw new SQLException("Echec de la creation de la categorie, aucune ligne affectee");
            }
            
            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    category.setId(generatedKeys.getInt(1));
                } else {
                    throw new SQLException("Echec de la creation de la categorie, aucun ID genere");
                }
            }
        }
        
        return category;
    }
    
    /**
     * Mettre a jour une categorie existante
     * @param category La categorie a mettre a jour
     * @return La categorie mise a jour
     * @throws SQLException En cas d'erreur SQL
     */
    public Category updateCategory(Category category) throws SQLException {
        String sql = "UPDATE categories SET name = ?, description = ? WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, category.getName());
            stmt.setString(2, category.getDescription());
            stmt.setInt(3, category.getId());
            
            int affectedRows = stmt.executeUpdate();
            
            if (affectedRows == 0) {
                throw new SQLException("Echec de la mise a jour de la categorie, categorie inexistante");
            }
        }
        
        return category;
    }
    
    /**
     * Supprimer une categorie par son identifiant
     * @param id Identifiant de la categorie a supprimer
     * @return true si la categorie a ete supprimee, false sinon
     * @throws SQLException En cas d'erreur SQL
     */
    public boolean deleteCategory(int id) throws SQLException {
        String sql = "DELETE FROM categories WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            int affectedRows = stmt.executeUpdate();
            
            return affectedRows > 0;
        }
    }
    
    /**
     * Extraire un objet Category depuis un ResultSet
     * @param rs Le ResultSet contenant les donnees
     * @return La categorie extraite
     * @throws SQLException En cas d'erreur SQL
     */
    private Category extractCategoryFromResultSet(ResultSet rs) throws SQLException {
        Category category = new Category();
        category.setId(rs.getInt("id"));
        category.setName(rs.getString("name"));
        category.setDescription(rs.getString("description"));
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            category.setCreatedAt(createdAt.toString());
        }
        
        return category;
    }
}
