package com.canteen.menu.models;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;

/**
 * Classe modèle représentant un repas du menu
 */
@XmlRootElement(name = "meal")
@XmlAccessorType(XmlAccessType.FIELD)
public class Meal {
    
    @XmlElement
    private Integer id;
    
    @XmlElement
    private String name;
    
    @XmlElement
    private String description;
    
    @XmlElement
    private Double price;
    
    @XmlElement
    private Integer categoryId;
    
    @XmlElement
    private String imageUrl;
    
    @XmlElement
    private Boolean available;
    
    @XmlElement
    private Date createdAt;
    
    @XmlElement
    private NutritionalInfo nutritionalInfo;
    
    @XmlElementWrapper(name = "allergens")
    @XmlElement(name = "allergen")
    private List<Allergen> allergens;
    
    /**
     * Constructeur par défaut
     */
    public Meal() {
        this.allergens = new ArrayList<>();
    }
    
    /**
     * Constructeur avec tous les paramètres
     */
    public Meal(Integer id, String name, String description, Double price, Integer categoryId,
                String imageUrl, Boolean available, Date createdAt, NutritionalInfo nutritionalInfo,
                List<Allergen> allergens) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.imageUrl = imageUrl;
        this.available = available;
        this.createdAt = createdAt;
        this.nutritionalInfo = nutritionalInfo;
        this.allergens = allergens != null ? allergens : new ArrayList<>();
    }
    
    /**
     * Obtient l'identifiant du repas
     */
    public Integer getId() {
        return id;
    }
    
    /**
     * Définit l'identifiant du repas
     */
    public void setId(Integer id) {
        this.id = id;
    }
    
    /**
     * Obtient le nom du repas
     */
    public String getName() {
        return name;
    }
    
    /**
     * Définit le nom du repas
     */
    public void setName(String name) {
        this.name = name;
    }
    
    /**
     * Obtient la description du repas
     */
    public String getDescription() {
        return description;
    }
    
    /**
     * Définit la description du repas
     */
    public void setDescription(String description) {
        this.description = description;
    }
    
    /**
     * Obtient le prix du repas
     */
    public Double getPrice() {
        return price;
    }
    
    /**
     * Définit le prix du repas
     */
    public void setPrice(Double price) {
        this.price = price;
    }
    
    /**
     * Obtient l'identifiant de la catégorie
     */
    public Integer getCategoryId() {
        return categoryId;
    }
    
    /**
     * Définit l'identifiant de la catégorie
     */
    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
    
    /**
     * Obtient l'URL de l'image du repas
     */
    public String getImageUrl() {
        return imageUrl;
    }
    
    /**
     * Définit l'URL de l'image du repas
     */
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    /**
     * Obtient la disponibilité du repas
     */
    public Boolean getAvailable() {
        return available;
    }
    
    /**
     * Définit la disponibilité du repas
     */
    public void setAvailable(Boolean available) {
        this.available = available;
    }
    
    /**
     * Obtient la date de création du repas
     */
    public Date getCreatedAt() {
        return createdAt;
    }
    
    /**
     * Définit la date de création du repas
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    
    /**
     * Obtient les informations nutritionnelles du repas
     */
    public NutritionalInfo getNutritionalInfo() {
        return nutritionalInfo;
    }
    
    /**
     * Définit les informations nutritionnelles du repas
     */
    public void setNutritionalInfo(NutritionalInfo nutritionalInfo) {
        this.nutritionalInfo = nutritionalInfo;
    }
    
    /**
     * Obtient la liste des allergènes du repas
     */
    public List<Allergen> getAllergens() {
        return allergens;
    }
    
    /**
     * Définit la liste des allergènes du repas
     */
    public void setAllergens(List<Allergen> allergens) {
        this.allergens = allergens;
    }
}
