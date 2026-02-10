package com.canteen.menu.models;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

/**
 * Classe modèle représentant un allergène associé à un repas
 */
@XmlRootElement(name = "allergen")
@XmlAccessorType(XmlAccessType.FIELD)
public class Allergen {
    
    @XmlElement
    private Integer id;
    
    @XmlElement
    private Integer mealId;
    
    @XmlElement
    private String allergenName;
    
    /**
     * Constructeur par défaut
     */
    public Allergen() {
    }
    
    /**
     * Constructeur avec tous les paramètres
     */
    public Allergen(Integer id, Integer mealId, String allergenName) {
        this.id = id;
        this.mealId = mealId;
        this.allergenName = allergenName;
    }
    
    /**
     * Obtient l'identifiant de l'allergène
     */
    public Integer getId() {
        return id;
    }
    
    /**
     * Définit l'identifiant de l'allergène
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
     * Obtient le nom de l'allergène
     */
    public String getAllergenName() {
        return allergenName;
    }
    
    /**
     * Définit le nom de l'allergène
     */
    public void setAllergenName(String allergenName) {
        this.allergenName = allergenName;
    }
}
