package com.canteen.menu.dao;

import com.canteen.menu.models.Meal;
import com.canteen.menu.models.NutritionalInfo;
import com.canteen.menu.utils.DatabaseConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO pour la gestion des plats dans la base de donnees
 * Utilise PreparedStatement pour prevenir les injections SQL
 */
public class MealDAO {
    
    /**
     * Recuperer tous les plats avec leurs informations nutritionnelles et allergenes
     * @return Liste de tous les plats
     * @throws SQLException En cas d'erreur SQL
     */
    public List<Meal> getAllMeals() throws SQLException {
        List<Meal> meals = new ArrayList<>();
        String sql = "SELECT m.*, c.name as category_name, " +
                    "n.calories, n.protein, n.carbs, n.fat, n.fiber, n.sodium " +
                    "FROM meals m " +
                    "LEFT JOIN categories c ON m.category_id = c.id " +
                    "LEFT JOIN nutritional_info n ON m.id = n.meal_id " +
                    "ORDER BY m.id";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                Meal meal = extractMealFromResultSet(rs);
                loadAllergens(meal, conn);
                meals.add(meal);
            }
        }
        
        return meals;
    }
    
    /**
     * Recuperer un plat par son identifiant
     * @param id Identifiant du plat
     * @return Le plat trouve ou null si inexistant
     * @throws SQLException En cas d'erreur SQL
     */
    public Meal getMealById(int id) throws SQLException {
        String sql = "SELECT m.*, c.name as category_name, " +
                    "n.calories, n.protein, n.carbs, n.fat, n.fiber, n.sodium " +
                    "FROM meals m " +
                    "LEFT JOIN categories c ON m.category_id = c.id " +
                    "LEFT JOIN nutritional_info n ON m.id = n.meal_id " +
                    "WHERE m.id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Meal meal = extractMealFromResultSet(rs);
                    loadAllergens(meal, conn);
                    return meal;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Recuperer les plats par categorie
     * @param categoryId Identifiant de la categorie
     * @return Liste des plats de la categorie
     * @throws SQLException En cas d'erreur SQL
     */
    public List<Meal> getMealsByCategory(int categoryId) throws SQLException {
        List<Meal> meals = new ArrayList<>();
        String sql = "SELECT m.*, c.name as category_name, " +
                    "n.calories, n.protein, n.carbs, n.fat, n.fiber, n.sodium " +
                    "FROM meals m " +
                    "LEFT JOIN categories c ON m.category_id = c.id " +
                    "LEFT JOIN nutritional_info n ON m.id = n.meal_id " +
                    "WHERE m.category_id = ? " +
                    "ORDER BY m.id";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, categoryId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Meal meal = extractMealFromResultSet(rs);
                    loadAllergens(meal, conn);
                    meals.add(meal);
                }
            }
        }
        
        return meals;
    }
    
    /**
     * Creer un nouveau plat
     * @param meal Le plat a creer
     * @return Le plat cree avec son identifiant genere
     * @throws SQLException En cas d'erreur SQL
     */
    public Meal createMeal(Meal meal) throws SQLException {
        String sql = "INSERT INTO meals (name, description, price, category_id, image_url, available) " +
                    "VALUES (?, ?, ?, ?, ?, ?)";
        
        Connection conn = null;
        try {
            conn = DatabaseConnection.getConnection();
            conn.setAutoCommit(false);
            
            try (PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
                stmt.setString(1, meal.getName());
                stmt.setString(2, meal.getDescription());
                stmt.setBigDecimal(3, meal.getPrice());
                stmt.setInt(4, meal.getCategoryId());
                stmt.setString(5, meal.getImageUrl());
                stmt.setBoolean(6, meal.getAvailable() != null ? meal.getAvailable() : true);
                
                int affectedRows = stmt.executeUpdate();
                
                if (affectedRows == 0) {
                    throw new SQLException("Echec de la creation du plat, aucune ligne affectee");
                }
                
                try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        meal.setId(generatedKeys.getInt(1));
                    } else {
                        throw new SQLException("Echec de la creation du plat, aucun ID genere");
                    }
                }
            }
            
            if (meal.getNutritionalInfo() != null) {
                createNutritionalInfo(meal.getId(), meal.getNutritionalInfo(), conn);
            }
            
            if (meal.getAllergens() != null && !meal.getAllergens().isEmpty()) {
                createAllergens(meal.getId(), meal.getAllergens(), conn);
            }
            
            conn.commit();
            
            return getMealById(meal.getId());
            
        } catch (SQLException e) {
            if (conn != null) {
                try {
                    conn.rollback();
                } catch (SQLException ex) {
                    throw new SQLException("Erreur lors du rollback: " + ex.getMessage());
                }
            }
            throw e;
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
    }
    
    /**
     * Mettre a jour un plat existant
     * @param meal Le plat a mettre a jour
     * @return Le plat mis a jour
     * @throws SQLException En cas d'erreur SQL
     */
    public Meal updateMeal(Meal meal) throws SQLException {
        String sql = "UPDATE meals SET name = ?, description = ?, price = ?, " +
                    "category_id = ?, image_url = ?, available = ? " +
                    "WHERE id = ?";
        
        Connection conn = null;
        try {
            conn = DatabaseConnection.getConnection();
            conn.setAutoCommit(false);
            
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, meal.getName());
                stmt.setString(2, meal.getDescription());
                stmt.setBigDecimal(3, meal.getPrice());
                stmt.setInt(4, meal.getCategoryId());
                stmt.setString(5, meal.getImageUrl());
                stmt.setBoolean(6, meal.getAvailable() != null ? meal.getAvailable() : true);
                stmt.setInt(7, meal.getId());
                
                int affectedRows = stmt.executeUpdate();
                
                if (affectedRows == 0) {
                    throw new SQLException("Echec de la mise a jour du plat, plat inexistant");
                }
            }
            
            deleteNutritionalInfo(meal.getId(), conn);
            if (meal.getNutritionalInfo() != null) {
                createNutritionalInfo(meal.getId(), meal.getNutritionalInfo(), conn);
            }
            
            deleteAllergens(meal.getId(), conn);
            if (meal.getAllergens() != null && !meal.getAllergens().isEmpty()) {
                createAllergens(meal.getId(), meal.getAllergens(), conn);
            }
            
            conn.commit();
            
            return getMealById(meal.getId());
            
        } catch (SQLException e) {
            if (conn != null) {
                try {
                    conn.rollback();
                } catch (SQLException ex) {
                    throw new SQLException("Erreur lors du rollback: " + ex.getMessage());
                }
            }
            throw e;
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
    }
    
    /**
     * Supprimer un plat par son identifiant
     * @param id Identifiant du plat a supprimer
     * @return true si le plat a ete supprime, false sinon
     * @throws SQLException En cas d'erreur SQL
     */
    public boolean deleteMeal(int id) throws SQLException {
        Connection conn = null;
        try {
            conn = DatabaseConnection.getConnection();
            conn.setAutoCommit(false);
            
            deleteAllergens(id, conn);
            deleteNutritionalInfo(id, conn);
            
            String sql = "DELETE FROM meals WHERE id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, id);
                int affectedRows = stmt.executeUpdate();
                
                conn.commit();
                return affectedRows > 0;
            }
            
        } catch (SQLException e) {
            if (conn != null) {
                try {
                    conn.rollback();
                } catch (SQLException ex) {
                    throw new SQLException("Erreur lors du rollback: " + ex.getMessage());
                }
            }
            throw e;
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
    }
    
    /**
     * Extraire un objet Meal depuis un ResultSet
     * @param rs Le ResultSet contenant les donnees
     * @return Le plat extrait
     * @throws SQLException En cas d'erreur SQL
     */
    private Meal extractMealFromResultSet(ResultSet rs) throws SQLException {
        Meal meal = new Meal();
        meal.setId(rs.getInt("id"));
        meal.setName(rs.getString("name"));
        meal.setDescription(rs.getString("description"));
        meal.setPrice(rs.getBigDecimal("price"));
        meal.setCategoryId(rs.getInt("category_id"));
        meal.setCategoryName(rs.getString("category_name"));
        meal.setImageUrl(rs.getString("image_url"));
        meal.setAvailable(rs.getBoolean("available"));
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            meal.setCreatedAt(createdAt.toString());
        }
        
        Integer calories = (Integer) rs.getObject("calories");
        if (calories != null) {
            NutritionalInfo nutritionalInfo = new NutritionalInfo();
            nutritionalInfo.setCalories(calories);
            nutritionalInfo.setProtein(rs.getBigDecimal("protein"));
            nutritionalInfo.setCarbs(rs.getBigDecimal("carbs"));
            nutritionalInfo.setFat(rs.getBigDecimal("fat"));
            nutritionalInfo.setFiber(rs.getBigDecimal("fiber"));
            nutritionalInfo.setSodium(rs.getBigDecimal("sodium"));
            meal.setNutritionalInfo(nutritionalInfo);
        }
        
        return meal;
    }
    
    /**
     * Charger les allergenes d'un plat
     * @param meal Le plat pour lequel charger les allergenes
     * @param conn La connexion a utiliser
     * @throws SQLException En cas d'erreur SQL
     */
    private void loadAllergens(Meal meal, Connection conn) throws SQLException {
        String sql = "SELECT allergen_name FROM allergens WHERE meal_id = ?";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, meal.getId());
            
            try (ResultSet rs = stmt.executeQuery()) {
                List<String> allergens = new ArrayList<>();
                while (rs.next()) {
                    allergens.add(rs.getString("allergen_name"));
                }
                meal.setAllergens(allergens);
            }
        }
    }
    
    /**
     * Creer les informations nutritionnelles pour un plat
     * @param mealId Identifiant du plat
     * @param nutritionalInfo Les informations nutritionnelles
     * @param conn La connexion a utiliser
     * @throws SQLException En cas d'erreur SQL
     */
    private void createNutritionalInfo(int mealId, NutritionalInfo nutritionalInfo, Connection conn) throws SQLException {
        String sql = "INSERT INTO nutritional_info (meal_id, calories, protein, carbs, fat, fiber, sodium) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, mealId);
            stmt.setInt(2, nutritionalInfo.getCalories());
            stmt.setBigDecimal(3, nutritionalInfo.getProtein());
            stmt.setBigDecimal(4, nutritionalInfo.getCarbs());
            stmt.setBigDecimal(5, nutritionalInfo.getFat());
            stmt.setBigDecimal(6, nutritionalInfo.getFiber());
            stmt.setBigDecimal(7, nutritionalInfo.getSodium());
            
            stmt.executeUpdate();
        }
    }
    
    /**
     * Creer les allergenes pour un plat
     * @param mealId Identifiant du plat
     * @param allergens Liste des allergenes
     * @param conn La connexion a utiliser
     * @throws SQLException En cas d'erreur SQL
     */
    private void createAllergens(int mealId, List<String> allergens, Connection conn) throws SQLException {
        String sql = "INSERT INTO allergens (meal_id, allergen_name) VALUES (?, ?)";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            for (String allergen : allergens) {
                stmt.setInt(1, mealId);
                stmt.setString(2, allergen);
                stmt.addBatch();
            }
            stmt.executeBatch();
        }
    }
    
    /**
     * Supprimer les informations nutritionnelles d'un plat
     * @param mealId Identifiant du plat
     * @param conn La connexion a utiliser
     * @throws SQLException En cas d'erreur SQL
     */
    private void deleteNutritionalInfo(int mealId, Connection conn) throws SQLException {
        String sql = "DELETE FROM nutritional_info WHERE meal_id = ?";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, mealId);
            stmt.executeUpdate();
        }
    }
    
    /**
     * Supprimer les allergenes d'un plat
     * @param mealId Identifiant du plat
     * @param conn La connexion a utiliser
     * @throws SQLException En cas d'erreur SQL
     */
    private void deleteAllergens(int mealId, Connection conn) throws SQLException {
        String sql = "DELETE FROM allergens WHERE meal_id = ?";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, mealId);
            stmt.executeUpdate();
        }
    }
}
