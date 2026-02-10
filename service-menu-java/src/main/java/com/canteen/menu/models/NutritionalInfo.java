package com.canteen.menu.models;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

/**
 * Classe modèle représentant les informations nutritionnelles d'un repas
 */
@XmlRootElement(name = "nutritionalInfo")
@XmlAccessorType(XmlAccessType.FIELD)
public class NutritionalInfo {
    
    @XmlElement
    private Integer id;
    
    @XmlElement
    private Integer mealId;
    
    @XmlElement
    private Integer calories;
    
    @XmlElement
    private Double protein;
    
    @XmlElement
    private Double carbs;
    
    @XmlElement
    private Double fat;
    
    @XmlElement
    private Double fiber;
    
    @XmlElement
    private Double sodium;
    
    /**
     * Constructeur par défaut
     */
    public NutritionalInfo() {
    }
    
    /**
     * Constructeur avec tous les paramètres
     */
    public NutritionalInfo(Integer id, Integer mealId, Integer calories, Double protein, 
                          Double carbs, Double fat, Double fiber, Double sodium) {
        this.id = id;
        this.mealId = mealId;
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.fiber = fiber;
        this.sodium = sodium;
    }
    
    /**
     * Obtient l'identifiant des informations nutritionnelles
     */
    public Integer getId() {
        return id;
    }
    
    /**
     * Définit l'identifiant des informations nutritionnelles
     */
    public void setId(Integer id) {
        this.id = id;
    }
    
    /**
     * Obtient l'identifiant du repas
     */
    public Integer getMealId() {
        return mealId;
    }
    
    /**
     * Définit l'identifiant du repas
     */
    public void setMealId(Integer mealId) {
        this.mealId = mealId;
    }
    
    /**
     * Obtient le nombre de calories
     */
    public Integer getCalories() {
        return calories;
    }
    
    /**
     * Définit le nombre de calories
     */
    public void setCalories(Integer calories) {
        this.calories = calories;
    }
    
    /**
     * Obtient la quantité de protéines
     */
    public Double getProtein() {
        return protein;
    }
    
    /**
     * Définit la quantité de protéines
     */
    public void setProtein(Double protein) {
        this.protein = protein;
    }
    
    /**
     * Obtient la quantité de glucides
     */
    public Double getCarbs() {
        return carbs;
    }
    
    /**
     * Définit la quantité de glucides
     */
    public void setCarbs(Double carbs) {
        this.carbs = carbs;
    }
    
    /**
     * Obtient la quantité de lipides
     */
    public Double getFat() {
        return fat;
    }
    
    /**
     * Définit la quantité de lipides
     */
    public void setFat(Double fat) {
        this.fat = fat;
    }
    
    /**
     * Obtient la quantité de fibres
     */
    public Double getFiber() {
        return fiber;
    }
    
    /**
     * Définit la quantité de fibres
     */
    public void setFiber(Double fiber) {
        this.fiber = fiber;
    }
    
    /**
     * Obtient la quantité de sodium
     */
    public Double getSodium() {
        return sodium;
    }
    
    /**
     * Définit la quantité de sodium
     */
    public void setSodium(Double sodium) {
        this.sodium = sodium;
    }
}
