-- Base de donnees pour le service menu
CREATE DATABASE IF NOT EXISTS canteen_menu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE canteen_menu;

-- Table des categories de plats
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table des plats
CREATE TABLE IF NOT EXISTS meals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INT,
    image_url VARCHAR(500),
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB;

-- Table des informations nutritionnelles
CREATE TABLE IF NOT EXISTS nutritional_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    meal_id INT,
    calories INT,
    protein DECIMAL(5,2),
    carbs DECIMAL(5,2),
    fat DECIMAL(5,2),
    fiber DECIMAL(5,2),
    sodium DECIMAL(5,2),
    FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table des allergenes
CREATE TABLE IF NOT EXISTS allergens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    meal_id INT,
    allergen_name VARCHAR(100),
    FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Donnees initiales pour les categories
INSERT INTO categories (name, description) VALUES
('Entree', 'Entrees et salades fraiches'),
('Plat', 'Plats principaux'),
('Dessert', 'Desserts maison'),
('Boisson', 'Boissons chaudes et froides');

-- Donnees initiales pour les plats
INSERT INTO meals (name, description, price, category_id, available) VALUES
('Salade Cesar', 'Salade fraiche avec poulet grille, croutons et parmesan', 6.50, 1, TRUE),
('Salade Nicoise', 'Salade avec thon, oeufs, tomates et olives', 7.20, 1, TRUE),
('Poulet roti', 'Poulet roti aux herbes avec legumes de saison', 8.90, 2, TRUE),
('Steak frites', 'Steak grille avec frites maison', 9.50, 2, TRUE),
('Pates carbonara', 'Pates fraiches sauce carbonara italienne', 7.80, 2, TRUE),
('Tarte aux pommes', 'Tarte maison aux pommes et cannelle', 4.20, 3, TRUE),
('Tiramisu', 'Tiramisu authentique italien', 4.50, 3, TRUE),
('Mousse au chocolat', 'Mousse onctueuse au chocolat noir', 3.90, 3, TRUE),
('Cafe', 'Cafe expresso', 1.50, 4, TRUE),
('The', 'Selection de thes', 1.30, 4, TRUE),
('Jus d''orange', 'Jus d''orange frais presse', 2.50, 4, TRUE);

-- Informations nutritionnelles pour quelques plats
INSERT INTO nutritional_info (meal_id, calories, protein, carbs, fat, fiber, sodium) VALUES
(1, 350, 25.5, 15.2, 22.3, 3.5, 1.2),
(3, 450, 35.0, 10.5, 28.0, 2.8, 1.5),
(6, 320, 4.5, 55.0, 12.0, 2.0, 0.3);

-- Allergenes pour quelques plats
INSERT INTO allergens (meal_id, allergen_name) VALUES
(1, 'Gluten'),
(1, 'Oeufs'),
(1, 'Lactose'),
(3, 'Aucun'),
(5, 'Gluten'),
(5, 'Lactose'),
(5, 'Oeufs'),
(6, 'Gluten'),
(7, 'Gluten'),
(7, 'Oeufs'),
(7, 'Lactose');
