package com.canteen.menu.dao;

import com.canteen.menu.models.*;
import com.canteen.menu.utils.DatabaseConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO pour la gestion des plats
 */
public class MealDAO {

    /**
     * Recupere tous les plats avec leurs informations completes
     * @return Liste des plats
     * @throws SQLException en cas d'erreur
     */
    public List<Meal> findAll() throws SQLException {
        List<Meal> meals = new ArrayList<>();
        String sql = "SELECT m.id, m.name, m.description, m.price, m.category_id, m.available, " +
                    "c.name as category_name, c.description as category_desc " +
                    "FROM meals m LEFT JOIN categories c ON m.category_id = c.id " +
                    "ORDER BY m.name";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                Meal meal = createMealFromResultSet(rs);
                loadMealDetails(meal);
                meals.add(meal);
            }
        }
        
        return meals;
    }

    /**
     * Recupere un plat par son ID avec toutes ses informations
     * @param id Identifiant du plat
     * @return Plat trouve ou null
     * @throws SQLException en cas d'erreur
     */
    public Meal findById(int id) throws SQLException {
        String sql = "SELECT m.id, m.name, m.description, m.price, m.category_id, m.available, " +
                    "c.name as category_name, c.description as category_desc " +
                    "FROM meals m LEFT JOIN categories c ON m.category_id = c.id " +
                    "WHERE m.id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Meal meal = createMealFromResultSet(rs);
                    loadMealDetails(meal);
                    return meal;
                }
            }
        }
        
        return null;
    }

    /**
     * Recupere les plats par categorie
     * @param categoryId Identifiant de la categorie
     * @return Liste des plats
     * @throws SQLException en cas d'erreur
     */
    public List<Meal> findByCategory(int categoryId) throws SQLException {
        List<Meal> meals = new ArrayList<>();
        String sql = "SELECT m.id, m.name, m.description, m.price, m.category_id, m.available, " +
                    "c.name as category_name, c.description as category_desc " +
                    "FROM meals m LEFT JOIN categories c ON m.category_id = c.id " +
                    "WHERE m.category_id = ? ORDER BY m.name";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, categoryId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Meal meal = createMealFromResultSet(rs);
                    loadMealDetails(meal);
                    meals.add(meal);
                }
            }
        }
        
        return meals;
    }

    /**
     * Recupere les plats disponibles
     * @return Liste des plats disponibles
     * @throws SQLException en cas d'erreur
     */
    public List<Meal> findAvailable() throws SQLException {
        List<Meal> meals = new ArrayList<>();
        String sql = "SELECT m.id, m.name, m.description, m.price, m.category_id, m.available, " +
                    "c.name as category_name, c.description as category_desc " +
                    "FROM meals m LEFT JOIN categories c ON m.category_id = c.id " +
                    "WHERE m.available = true ORDER BY m.name";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                Meal meal = createMealFromResultSet(rs);
                loadMealDetails(meal);
                meals.add(meal);
            }
        }
        
        return meals;
    }

    /**
     * Cree un nouveau plat
     * @param meal Plat a creer
     * @return ID du plat cree
     * @throws SQLException en cas d'erreur
     */
    public int create(Meal meal) throws SQLException {
        String sql = "INSERT INTO meals (name, description, price, category_id, available) " +
                    "VALUES (?, ?, ?, ?, ?)";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setString(1, meal.getName());
            stmt.setString(2, meal.getDescription());
            stmt.setDouble(3, meal.getPrice());
            stmt.setInt(4, meal.getCategoryId());
            stmt.setBoolean(5, meal.getAvailable() != null ? meal.getAvailable() : true);
            
            stmt.executeUpdate();
            
            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    int mealId = generatedKeys.getInt(1);
                    meal.setId(mealId);
                    
                    // Creation des informations nutritionnelles si presentes
                    if (meal.getNutritionalInfo() != null) {
                        createNutritionalInfo(meal.getId(), meal.getNutritionalInfo());
                    }
                    
                    return mealId;
                }
            }
        }
        
        throw new SQLException("Echec de la creation du plat");
    }

    /**
     * Met a jour un plat existant
     * @param meal Plat a mettre a jour
     * @return true si la mise a jour a reussi
     * @throws SQLException en cas d'erreur
     */
    public boolean update(Meal meal) throws SQLException {
        String sql = "UPDATE meals SET name = ?, description = ?, price = ?, " +
                    "category_id = ?, available = ? WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, meal.getName());
            stmt.setString(2, meal.getDescription());
            stmt.setDouble(3, meal.getPrice());
            stmt.setInt(4, meal.getCategoryId());
            stmt.setBoolean(5, meal.getAvailable() != null ? meal.getAvailable() : true);
            stmt.setInt(6, meal.getId());
            
            return stmt.executeUpdate() > 0;
        }
    }

    /**
     * Supprime un plat
     * @param id Identifiant du plat
     * @return true si la suppression a reussi
     * @throws SQLException en cas d'erreur
     */
    public boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM meals WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            
            return stmt.executeUpdate() > 0;
        }
    }

    /**
     * Cree un objet Meal a partir d'un ResultSet
     */
    private Meal createMealFromResultSet(ResultSet rs) throws SQLException {
        Meal meal = new Meal(
            rs.getInt("id"),
            rs.getString("name"),
            rs.getString("description"),
            rs.getDouble("price"),
            rs.getInt("category_id"),
            rs.getBoolean("available")
        );
        
        // Ajout de la categorie si presente
        String categoryName = rs.getString("category_name");
        if (categoryName != null) {
            Category category = new Category(
                rs.getInt("category_id"),
                categoryName,
                rs.getString("category_desc")
            );
            meal.setCategory(category);
        }
        
        return meal;
    }

    /**
     * Charge les details d'un plat (informations nutritionnelles et allergenes)
     */
    private void loadMealDetails(Meal meal) throws SQLException {
        loadNutritionalInfo(meal);
        loadAllergens(meal);
    }

    /**
     * Charge les informations nutritionnelles d'un plat
     */
    private void loadNutritionalInfo(Meal meal) throws SQLException {
        String sql = "SELECT id, meal_id, calories, proteins, carbohydrates, fats, fiber " +
                    "FROM nutritional_info WHERE meal_id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, meal.getId());
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    NutritionalInfo info = new NutritionalInfo(
                        rs.getInt("id"),
                        rs.getInt("meal_id"),
                        rs.getDouble("calories"),
                        rs.getDouble("proteins"),
                        rs.getDouble("carbohydrates"),
                        rs.getDouble("fats"),
                        rs.getDouble("fiber")
                    );
                    meal.setNutritionalInfo(info);
                }
            }
        }
    }

    /**
     * Charge les allergenes d'un plat
     */
    private void loadAllergens(Meal meal) throws SQLException {
        String sql = "SELECT a.id, a.name, a.description " +
                    "FROM allergens a " +
                    "INNER JOIN meal_allergens ma ON a.id = ma.allergen_id " +
                    "WHERE ma.meal_id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, meal.getId());
            
            try (ResultSet rs = stmt.executeQuery()) {
                List<Allergen> allergens = new ArrayList<>();
                while (rs.next()) {
                    Allergen allergen = new Allergen(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("description")
                    );
                    allergens.add(allergen);
                }
                meal.setAllergens(allergens);
            }
        }
    }

    /**
     * Cree les informations nutritionnelles pour un plat
     */
    private void createNutritionalInfo(int mealId, NutritionalInfo info) throws SQLException {
        String sql = "INSERT INTO nutritional_info (meal_id, calories, proteins, carbohydrates, fats, fiber) " +
                    "VALUES (?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, mealId);
            stmt.setDouble(2, info.getCalories() != null ? info.getCalories() : 0);
            stmt.setDouble(3, info.getProteins() != null ? info.getProteins() : 0);
            stmt.setDouble(4, info.getCarbohydrates() != null ? info.getCarbohydrates() : 0);
            stmt.setDouble(5, info.getFats() != null ? info.getFats() : 0);
            stmt.setDouble(6, info.getFiber() != null ? info.getFiber() : 0);
            
            stmt.executeUpdate();
        }
    }
}
