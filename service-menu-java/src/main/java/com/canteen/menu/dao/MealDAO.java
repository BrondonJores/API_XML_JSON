package com.canteen.menu.dao;

import com.canteen.menu.models.Meal;
import com.canteen.menu.models.NutritionalInfo;
import com.canteen.menu.models.Allergen;
import com.canteen.menu.utils.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * Classe DAO pour la gestion des repas dans la base de donnees
 */
public class MealDAO {

    /**
     * Recupere tous les repas avec leurs informations nutritionnelles et allergenes
     * 
     * @return Liste de tous les repas
     */
    public List<Meal> findAll() {
        List<Meal> meals = new ArrayList<>();
        String sql = "SELECT id, name, description, price, category_id, image_url, available, created_at " +
                     "FROM meals ORDER BY id";
        
        try (Connection conn = DatabaseConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                Meal meal = extractMealFromResultSet(rs);
                loadNutritionalInfo(conn, meal);
                loadAllergens(conn, meal);
                meals.add(meal);
            }
        } catch (SQLException e) {
            System.err.println("Erreur lors de la recuperation des repas: " + e.getMessage());
            e.printStackTrace();
        }
        
        return meals;
    }

    /**
     * Recupere un repas par son identifiant avec toutes les informations
     * 
     * @param id Identifiant du repas
     * @return Le repas trouve ou null si non trouve
     */
    public Meal findById(int id) {
        String sql = "SELECT id, name, description, price, category_id, image_url, available, created_at " +
                     "FROM meals WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Meal meal = extractMealFromResultSet(rs);
                    loadNutritionalInfo(conn, meal);
                    loadAllergens(conn, meal);
                    return meal;
                }
            }
        } catch (SQLException e) {
            System.err.println("Erreur lors de la recuperation du repas: " + e.getMessage());
            e.printStackTrace();
        }
        
        return null;
    }

    /**
     * Recupere tous les repas d'une categorie specifique
     * 
     * @param categoryId Identifiant de la categorie
     * @return Liste des repas de la categorie
     */
    public List<Meal> findByCategoryId(int categoryId) {
        List<Meal> meals = new ArrayList<>();
        String sql = "SELECT id, name, description, price, category_id, image_url, available, created_at " +
                     "FROM meals WHERE category_id = ? ORDER BY id";
        
        try (Connection conn = DatabaseConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, categoryId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Meal meal = extractMealFromResultSet(rs);
                    loadNutritionalInfo(conn, meal);
                    loadAllergens(conn, meal);
                    meals.add(meal);
                }
            }
        } catch (SQLException e) {
            System.err.println("Erreur lors de la recuperation des repas par categorie: " + e.getMessage());
            e.printStackTrace();
        }
        
        return meals;
    }

    /**
     * Recupere tous les repas disponibles
     * 
     * @return Liste des repas disponibles
     */
    public List<Meal> findAvailableMeals() {
        List<Meal> meals = new ArrayList<>();
        String sql = "SELECT id, name, description, price, category_id, image_url, available, created_at " +
                     "FROM meals WHERE available = true ORDER BY id";
        
        try (Connection conn = DatabaseConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                Meal meal = extractMealFromResultSet(rs);
                loadNutritionalInfo(conn, meal);
                loadAllergens(conn, meal);
                meals.add(meal);
            }
        } catch (SQLException e) {
            System.err.println("Erreur lors de la recuperation des repas disponibles: " + e.getMessage());
            e.printStackTrace();
        }
        
        return meals;
    }

    /**
     * Enregistre un nouveau repas avec ses informations nutritionnelles et allergenes
     * 
     * @param meal Le repas a enregistrer
     * @return L'identifiant genere pour le nouveau repas, ou -1 en cas d'erreur
     */
    public int save(Meal meal) {
        Connection conn = null;
        
        try {
            conn = DatabaseConnection.getInstance().getConnection();
            conn.setAutoCommit(false);
            
            String mealSql = "INSERT INTO meals (name, description, price, category_id, image_url, available) " +
                           "VALUES (?, ?, ?, ?, ?, ?)";
            
            int mealId = -1;
            
            try (PreparedStatement stmt = conn.prepareStatement(mealSql, Statement.RETURN_GENERATED_KEYS)) {
                stmt.setString(1, meal.getName());
                stmt.setString(2, meal.getDescription());
                stmt.setDouble(3, meal.getPrice());
                stmt.setInt(4, meal.getCategoryId());
                stmt.setString(5, meal.getImageUrl());
                stmt.setBoolean(6, meal.getAvailable());
                
                int affectedRows = stmt.executeUpdate();
                
                if (affectedRows > 0) {
                    try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                        if (generatedKeys.next()) {
                            mealId = generatedKeys.getInt(1);
                        }
                    }
                }
            }
            
            if (mealId > 0) {
                if (meal.getNutritionalInfo() != null) {
                    saveNutritionalInfo(conn, mealId, meal.getNutritionalInfo());
                }
                
                if (meal.getAllergens() != null && !meal.getAllergens().isEmpty()) {
                    saveAllergens(conn, mealId, meal.getAllergens());
                }
                
                conn.commit();
                return mealId;
            } else {
                conn.rollback();
            }
            
        } catch (SQLException e) {
            System.err.println("Erreur lors de l'enregistrement du repas: " + e.getMessage());
            e.printStackTrace();
            if (conn != null) {
                try {
                    conn.rollback();
                } catch (SQLException ex) {
                    System.err.println("Erreur lors du rollback: " + ex.getMessage());
                }
            }
        } finally {
            if (conn != null) {
                try {
                    conn.setAutoCommit(true);
                    conn.close();
                } catch (SQLException e) {
                    System.err.println("Erreur lors de la fermeture de la connexion: " + e.getMessage());
                }
            }
        }
        
        return -1;
    }

    /**
     * Met a jour un repas existant avec toutes ses informations
     * 
     * @param meal Le repas a mettre a jour
     * @return true si la mise a jour a reussi, false sinon
     */
    public boolean update(Meal meal) {
        Connection conn = null;
        
        try {
            conn = DatabaseConnection.getInstance().getConnection();
            conn.setAutoCommit(false);
            
            String mealSql = "UPDATE meals SET name = ?, description = ?, price = ?, category_id = ?, " +
                           "image_url = ?, available = ? WHERE id = ?";
            
            try (PreparedStatement stmt = conn.prepareStatement(mealSql)) {
                stmt.setString(1, meal.getName());
                stmt.setString(2, meal.getDescription());
                stmt.setDouble(3, meal.getPrice());
                stmt.setInt(4, meal.getCategoryId());
                stmt.setString(5, meal.getImageUrl());
                stmt.setBoolean(6, meal.getAvailable());
                stmt.setInt(7, meal.getId());
                
                int affectedRows = stmt.executeUpdate();
                
                if (affectedRows > 0) {
                    if (meal.getNutritionalInfo() != null) {
                        updateNutritionalInfo(conn, meal.getId(), meal.getNutritionalInfo());
                    }
                    
                    deleteAllergens(conn, meal.getId());
                    if (meal.getAllergens() != null && !meal.getAllergens().isEmpty()) {
                        saveAllergens(conn, meal.getId(), meal.getAllergens());
                    }
                    
                    conn.commit();
                    return true;
                } else {
                    conn.rollback();
                }
            }
            
        } catch (SQLException e) {
            System.err.println("Erreur lors de la mise a jour du repas: " + e.getMessage());
            e.printStackTrace();
            if (conn != null) {
                try {
                    conn.rollback();
                } catch (SQLException ex) {
                    System.err.println("Erreur lors du rollback: " + ex.getMessage());
                }
            }
        } finally {
            if (conn != null) {
                try {
                    conn.setAutoCommit(true);
                    conn.close();
                } catch (SQLException e) {
                    System.err.println("Erreur lors de la fermeture de la connexion: " + e.getMessage());
                }
            }
        }
        
        return false;
    }

    /**
     * Supprime un repas par son identifiant
     * La suppression en cascade supprimera automatiquement les informations nutritionnelles et allergenes
     * 
     * @param id Identifiant du repas a supprimer
     * @return true si la suppression a reussi, false sinon
     */
    public boolean delete(int id) {
        String sql = "DELETE FROM meals WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            
            int affectedRows = stmt.executeUpdate();
            return affectedRows > 0;
            
        } catch (SQLException e) {
            System.err.println("Erreur lors de la suppression du repas: " + e.getMessage());
            e.printStackTrace();
        }
        
        return false;
    }

    /**
     * Extrait un objet Meal a partir d'un ResultSet
     */
    private Meal extractMealFromResultSet(ResultSet rs) throws SQLException {
        return new Meal(
            rs.getInt("id"),
            rs.getString("name"),
            rs.getString("description"),
            rs.getDouble("price"),
            rs.getInt("category_id"),
            rs.getString("image_url"),
            rs.getBoolean("available"),
            rs.getTimestamp("created_at"),
            null,
            new ArrayList<>()
        );
    }

    /**
     * Charge les informations nutritionnelles pour un repas
     */
    private void loadNutritionalInfo(Connection conn, Meal meal) throws SQLException {
        String sql = "SELECT id, meal_id, calories, protein, carbs, fat, fiber, sodium " +
                     "FROM nutritional_info WHERE meal_id = ?";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, meal.getId());
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    NutritionalInfo info = new NutritionalInfo(
                        rs.getInt("id"),
                        rs.getInt("meal_id"),
                        rs.getInt("calories"),
                        rs.getDouble("protein"),
                        rs.getDouble("carbs"),
                        rs.getDouble("fat"),
                        rs.getDouble("fiber"),
                        rs.getDouble("sodium")
                    );
                    meal.setNutritionalInfo(info);
                }
            }
        }
    }

    /**
     * Charge les allergenes pour un repas
     */
    private void loadAllergens(Connection conn, Meal meal) throws SQLException {
        String sql = "SELECT id, meal_id, allergen_name FROM allergens WHERE meal_id = ?";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, meal.getId());
            
            try (ResultSet rs = stmt.executeQuery()) {
                List<Allergen> allergens = new ArrayList<>();
                while (rs.next()) {
                    Allergen allergen = new Allergen(
                        rs.getInt("id"),
                        rs.getInt("meal_id"),
                        rs.getString("allergen_name")
                    );
                    allergens.add(allergen);
                }
                meal.setAllergens(allergens);
            }
        }
    }

    /**
     * Enregistre les informations nutritionnelles d'un repas
     */
    private void saveNutritionalInfo(Connection conn, int mealId, NutritionalInfo info) throws SQLException {
        String sql = "INSERT INTO nutritional_info (meal_id, calories, protein, carbs, fat, fiber, sodium) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, mealId);
            stmt.setInt(2, info.getCalories());
            stmt.setDouble(3, info.getProtein());
            stmt.setDouble(4, info.getCarbs());
            stmt.setDouble(5, info.getFat());
            stmt.setDouble(6, info.getFiber());
            stmt.setDouble(7, info.getSodium());
            stmt.executeUpdate();
        }
    }

    /**
     * Met a jour les informations nutritionnelles d'un repas
     */
    private void updateNutritionalInfo(Connection conn, int mealId, NutritionalInfo info) throws SQLException {
        String checkSql = "SELECT id FROM nutritional_info WHERE meal_id = ?";
        
        try (PreparedStatement checkStmt = conn.prepareStatement(checkSql)) {
            checkStmt.setInt(1, mealId);
            try (ResultSet rs = checkStmt.executeQuery()) {
                if (rs.next()) {
                    String updateSql = "UPDATE nutritional_info SET calories = ?, protein = ?, carbs = ?, " +
                                     "fat = ?, fiber = ?, sodium = ? WHERE meal_id = ?";
                    try (PreparedStatement stmt = conn.prepareStatement(updateSql)) {
                        stmt.setInt(1, info.getCalories());
                        stmt.setDouble(2, info.getProtein());
                        stmt.setDouble(3, info.getCarbs());
                        stmt.setDouble(4, info.getFat());
                        stmt.setDouble(5, info.getFiber());
                        stmt.setDouble(6, info.getSodium());
                        stmt.setInt(7, mealId);
                        stmt.executeUpdate();
                    }
                } else {
                    saveNutritionalInfo(conn, mealId, info);
                }
            }
        }
    }

    /**
     * Enregistre les allergenes d'un repas
     */
    private void saveAllergens(Connection conn, int mealId, List<Allergen> allergens) throws SQLException {
        String sql = "INSERT INTO allergens (meal_id, allergen_name) VALUES (?, ?)";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            for (Allergen allergen : allergens) {
                stmt.setInt(1, mealId);
                stmt.setString(2, allergen.getAllergenName());
                stmt.addBatch();
            }
            stmt.executeBatch();
        }
    }

    /**
     * Supprime tous les allergenes d'un repas
     */
    private void deleteAllergens(Connection conn, int mealId) throws SQLException {
        String sql = "DELETE FROM allergens WHERE meal_id = ?";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, mealId);
            stmt.executeUpdate();
        }
    }
}
