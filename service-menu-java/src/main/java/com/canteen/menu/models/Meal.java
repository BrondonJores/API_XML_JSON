package com.canteen.menu.models;

import jakarta.xml.bind.annotation.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Modele representant un plat de la cantine
 * Supporte la serialisation XML et JSON
 */
@XmlRootElement(name = "meal", namespace = "http://canteen.com/meal")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(namespace = "http://canteen.com/meal")
public class Meal {
    
    @XmlElement
    private Integer id;
    
    @XmlElement(required = true)
    private String name;
    
    @XmlElement
    private String description;
    
    @XmlElement(required = true)
    private BigDecimal price;
    
    @XmlElement(required = true)
    private Integer categoryId;
    
    @XmlElement
    private String categoryName;
    
    @XmlElement
    private String imageUrl;
    
    @XmlElement(defaultValue = "true")
    private Boolean available;
    
    @XmlElement
    private NutritionalInfo nutritionalInfo;
    
    @XmlElementWrapper(name = "allergens")
    @XmlElement(name = "allergen")
    private List<String> allergens;
    
    @XmlElement
    private String createdAt;
    
    // Constructeur par defaut requis pour JAXB
    public Meal() {
        this.available = true;
        this.allergens = new ArrayList<>();
    }
    
    // Constructeur avec parametres
    public Meal(Integer id, String name, String description, BigDecimal price, 
                Integer categoryId, String categoryName, String imageUrl, Boolean available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.imageUrl = imageUrl;
        this.available = available != null ? available : true;
        this.allergens = new ArrayList<>();
    }
    
    // Getters et Setters
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public Integer getCategoryId() {
        return categoryId;
    }
    
    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
    
    public String getCategoryName() {
        return categoryName;
    }
    
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public Boolean getAvailable() {
        return available;
    }
    
    public void setAvailable(Boolean available) {
        this.available = available;
    }
    
    public NutritionalInfo getNutritionalInfo() {
        return nutritionalInfo;
    }
    
    public void setNutritionalInfo(NutritionalInfo nutritionalInfo) {
        this.nutritionalInfo = nutritionalInfo;
    }
    
    public List<String> getAllergens() {
        return allergens;
    }
    
    public void setAllergens(List<String> allergens) {
        this.allergens = allergens;
    }
    
    public String getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
