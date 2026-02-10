package com.canteen.menu.models;

import jakarta.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Classe wrapper pour la serialisation XML d'une liste de categories
 */
@XmlRootElement(name = "categories")
@XmlAccessorType(XmlAccessType.FIELD)
public class CategoryList {
    
    @XmlElement(name = "category")
    private List<Category> categories;
    
    public CategoryList() {
        this.categories = new ArrayList<>();
    }
    
    public CategoryList(List<Category> categories) {
        this.categories = categories;
    }
    
    public List<Category> getCategories() {
        return categories;
    }
    
    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }
}
