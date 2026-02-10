package com.canteen.menu.models;

import jakarta.xml.bind.annotation.*;

/**
 * Modele representant une categorie de plats
 */
@XmlRootElement(name = "category")
@XmlAccessorType(XmlAccessType.FIELD)
public class Category {
    
    @XmlElement
    private Integer id;
    
    @XmlElement(required = true)
    private String name;
    
    @XmlElement
    private String description;
    
    @XmlElement
    private String createdAt;
    
    // Constructeur par defaut
    public Category() {
    }
    
    // Constructeur avec parametres
    public Category(Integer id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
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
    
    public String getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
