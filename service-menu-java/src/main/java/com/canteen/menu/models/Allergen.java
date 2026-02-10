package com.canteen.menu.models;

import jakarta.xml.bind.annotation.*;

/**
 * Modele representant un allergene
 */
@XmlRootElement(name = "allergen")
@XmlAccessorType(XmlAccessType.FIELD)
public class Allergen {
    
    @XmlElement
    private Integer id;
    
    @XmlElement(required = true)
    private Integer mealId;
    
    @XmlElement(required = true)
    private String allergenName;
    
    // Constructeur par defaut
    public Allergen() {
    }
    
    // Constructeur avec parametres
    public Allergen(Integer id, Integer mealId, String allergenName) {
        this.id = id;
        this.mealId = mealId;
        this.allergenName = allergenName;
    }
    
    // Getters et Setters
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public Integer getMealId() {
        return mealId;
    }
    
    public void setMealId(Integer mealId) {
        this.mealId = mealId;
    }
    
    public String getAllergenName() {
        return allergenName;
    }
    
    public void setAllergenName(String allergenName) {
        this.allergenName = allergenName;
    }
}
