package com.canteen.menu.dao;

import com.canteen.menu.models.Category;
import com.canteen.menu.utils.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * Classe DAO pour la gestion des categories dans la base de donnees
 */
public class CategoryDAO {

    /**
     * Recupere toutes les categories de la base de donnees
     * 
     * @return Liste de toutes les categories
     */
    public List<Category> findAll() {
        List<Category> categories = new ArrayList<>();
        String sql = "SELECT id, name, description, created_at FROM categories ORDER BY id";
        
        try (Connection conn = DatabaseConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                Category category = new Category(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("description"),
                    rs.getTimestamp("created_at")
                );
                categories.add(category);
            }
        } catch (SQLException e) {
            System.err.println("Erreur lors de la recuperation des categories: " + e.getMessage());
            e.printStackTrace();
        }
        
        return categories;
    }

    /**
     * Recupere une categorie par son identifiant
     * 
     * @param id Identifiant de la categorie
     * @return La categorie trouvee ou null si non trouvee
     */
    public Category findById(int id) {
        String sql = "SELECT id, name, description, created_at FROM categories WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Category(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("description"),
                        rs.getTimestamp("created_at")
                    );
                }
            }
        } catch (SQLException e) {
            System.err.println("Erreur lors de la recuperation de la categorie: " + e.getMessage());
            e.printStackTrace();
        }
        
        return null;
    }

    /**
     * Enregistre une nouvelle categorie dans la base de donnees
     * 
     * @param category La categorie a enregistrer
     * @return L'identifiant genere pour la nouvelle categorie, ou -1 en cas d'erreur
     */
    public int save(Category category) {
        String sql = "INSERT INTO categories (name, description) VALUES (?, ?)";
        
        try (Connection conn = DatabaseConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setString(1, category.getName());
            stmt.setString(2, category.getDescription());
            
            int affectedRows = stmt.executeUpdate();
            
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        return generatedKeys.getInt(1);
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println("Erreur lors de l'enregistrement de la categorie: " + e.getMessage());
            e.printStackTrace();
        }
        
        return -1;
    }

    /**
     * Met a jour une categorie existante
     * 
     * @param category La categorie a mettre a jour
     * @return true si la mise a jour a reussi, false sinon
     */
    public boolean update(Category category) {
        String sql = "UPDATE categories SET name = ?, description = ? WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, category.getName());
            stmt.setString(2, category.getDescription());
            stmt.setInt(3, category.getId());
            
            int affectedRows = stmt.executeUpdate();
            return affectedRows > 0;
            
        } catch (SQLException e) {
            System.err.println("Erreur lors de la mise a jour de la categorie: " + e.getMessage());
            e.printStackTrace();
        }
        
        return false;
    }

    /**
     * Supprime une categorie par son identifiant
     * 
     * @param id Identifiant de la categorie a supprimer
     * @return true si la suppression a reussi, false sinon
     */
    public boolean delete(int id) {
        String sql = "DELETE FROM categories WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            
            int affectedRows = stmt.executeUpdate();
            return affectedRows > 0;
            
        } catch (SQLException e) {
            System.err.println("Erreur lors de la suppression de la categorie: " + e.getMessage());
            e.printStackTrace();
        }
        
        return false;
    }
}
