package com.canteen.menu.models;

import jakarta.xml.bind.annotation.*;
import java.math.BigDecimal;

/**
 * Modele representant les informations nutritionnelles d'un plat
 */
@XmlRootElement(name = "nutritionalInfo", namespace = "http://canteen.com/meal")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(namespace = "http://canteen.com/meal")
public class NutritionalInfo {
    
    @XmlElement(required = true)
    private Integer calories;
    
    @XmlElement(required = true)
    private BigDecimal protein;
    
    @XmlElement(required = true)
    private BigDecimal carbs;
    
    @XmlElement(required = true)
    private BigDecimal fat;
    
    @XmlElement
    private BigDecimal fiber;
    
    @XmlElement
    private BigDecimal sodium;
    
    // Constructeur par defaut
    public NutritionalInfo() {
    }
    
    // Constructeur avec parametres
    public NutritionalInfo(Integer calories, BigDecimal protein, BigDecimal carbs, 
                          BigDecimal fat, BigDecimal fiber, BigDecimal sodium) {
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.fiber = fiber;
        this.sodium = sodium;
    }
    
    // Getters et Setters
    
    public Integer getCalories() {
        return calories;
    }
    
    public void setCalories(Integer calories) {
        this.calories = calories;
    }
    
    public BigDecimal getProtein() {
        return protein;
    }
    
    public void setProtein(BigDecimal protein) {
        this.protein = protein;
    }
    
    public BigDecimal getCarbs() {
        return carbs;
    }
    
    public void setCarbs(BigDecimal carbs) {
        this.carbs = carbs;
    }
    
    public BigDecimal getFat() {
        return fat;
    }
    
    public void setFat(BigDecimal fat) {
        this.fat = fat;
    }
    
    public BigDecimal getFiber() {
        return fiber;
    }
    
    public void setFiber(BigDecimal fiber) {
        this.fiber = fiber;
    }
    
    public BigDecimal getSodium() {
        return sodium;
    }
    
    public void setSodium(BigDecimal sodium) {
        this.sodium = sodium;
    }
}
