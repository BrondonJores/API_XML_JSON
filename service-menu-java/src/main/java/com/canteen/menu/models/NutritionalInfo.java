package com.canteen.menu.models;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

/**
 * Modele representant les informations nutritionnelles d'un plat
 */
@XmlRootElement(name = "nutritionalInfo")
@XmlAccessorType(XmlAccessType.FIELD)
public class NutritionalInfo {
    private Integer id;
    private Integer mealId;
    private Double calories;
    private Double proteins;
    private Double carbohydrates;
    private Double fats;
    private Double fiber;

    public NutritionalInfo() {}

    public NutritionalInfo(Integer id, Integer mealId, Double calories, Double proteins, 
                          Double carbohydrates, Double fats, Double fiber) {
        this.id = id;
        this.mealId = mealId;
        this.calories = calories;
        this.proteins = proteins;
        this.carbohydrates = carbohydrates;
        this.fats = fats;
        this.fiber = fiber;
    }

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

    public Double getCalories() {
        return calories;
    }

    public void setCalories(Double calories) {
        this.calories = calories;
    }

    public Double getProteins() {
        return proteins;
    }

    public void setProteins(Double proteins) {
        this.proteins = proteins;
    }

    public Double getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(Double carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public Double getFats() {
        return fats;
    }

    public void setFats(Double fats) {
        this.fats = fats;
    }

    public Double getFiber() {
        return fiber;
    }

    public void setFiber(Double fiber) {
        this.fiber = fiber;
    }
}
