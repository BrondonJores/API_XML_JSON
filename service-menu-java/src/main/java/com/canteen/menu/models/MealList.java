package com.canteen.menu.models;

import jakarta.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Classe wrapper pour la serialisation XML d'une liste de plats
 */
@XmlRootElement(name = "meals", namespace = "http://canteen.com/meal")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(namespace = "http://canteen.com/meal")
public class MealList {
    
    @XmlElement(name = "meal")
    private List<Meal> meals;
    
    public MealList() {
        this.meals = new ArrayList<>();
    }
    
    public MealList(List<Meal> meals) {
        this.meals = meals;
    }
    
    public List<Meal> getMeals() {
        return meals;
    }
    
    public void setMeals(List<Meal> meals) {
        this.meals = meals;
    }
}
