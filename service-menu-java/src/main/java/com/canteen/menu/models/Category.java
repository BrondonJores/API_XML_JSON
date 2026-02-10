package com.canteen.menu.models;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import java.util.Date;

/**
 * Classe modèle représentant une catégorie de repas
 */
@XmlRootElement(name = "category")
@XmlAccessorType(XmlAccessType.FIELD)
public class Category {
    
    @XmlElement
    private Integer id;
    
    @XmlElement
    private String name;
    
    @XmlElement
    private String description;
    
    @XmlElement
    private Date createdAt;
    
    /**
     * Constructeur par défaut
     */
    public Category() {
    }
    
    /**
     * Constructeur avec tous les paramètres
     */
    public Category(Integer id, String name, String description, Date createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
    }
    
    /**
     * Obtient l'identifiant de la catégorie
     */
    public Integer getId() {
        return id;
    }
    
    /**
     * Définit l'identifiant de la catégorie
     */
    public void setId(Integer id) {
        this.id = id;
    }
    
    /**
     * Obtient le nom de la catégorie
     */
    public String getName() {
        return name;
    }
    
    /**
     * Définit le nom de la catégorie
     */
    public void setName(String name) {
        this.name = name;
    }
    
    /**
     * Obtient la description de la catégorie
     */
    public String getDescription() {
        return description;
    }
    
    /**
     * Définit la description de la catégorie
     */
    public void setDescription(String description) {
        this.description = description;
    }
    
    /**
     * Obtient la date de création de la catégorie
     */
    public Date getCreatedAt() {
        return createdAt;
    }
    
    /**
     * Définit la date de création de la catégorie
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
