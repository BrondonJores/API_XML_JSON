package com.canteen.menu.models;

import javax.xml.bind.annotation.*;
import java.util.List;
import java.util.ArrayList;

/**
 * Modele representant un plat du menu
 */
@XmlRootElement(name = "meal")
@XmlAccessorType(XmlAccessType.FIELD)
public class Meal {
    private Integer id;
    private String name;
    private String description;
    private Double price;
    private Integer categoryId;
    private Boolean available;
    
    @XmlElement(name = "category")
    private Category category;
    
    @XmlElement(name = "nutritionalInfo")
    private NutritionalInfo nutritionalInfo;
    
    @XmlElementWrapper(name = "allergens")
    @XmlElement(name = "allergen")
    private List<Allergen> allergens;

    public Meal() {
        this.allergens = new ArrayList<>();
    }

    public Meal(Integer id, String name, String description, Double price, 
                Integer categoryId, Boolean available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.available = available;
        this.allergens = new ArrayList<>();
    }

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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public NutritionalInfo getNutritionalInfo() {
        return nutritionalInfo;
    }

    public void setNutritionalInfo(NutritionalInfo nutritionalInfo) {
        this.nutritionalInfo = nutritionalInfo;
    }

    public List<Allergen> getAllergens() {
        return allergens;
    }

    public void setAllergens(List<Allergen> allergens) {
        this.allergens = allergens;
    }
}
