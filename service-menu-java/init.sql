-- Script d'initialisation de la base de donnees pour le service Menu

CREATE DATABASE IF NOT EXISTS canteen_menu;
USE canteen_menu;

-- Table des categories
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
);

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
);

-- Table des allergenes
CREATE TABLE IF NOT EXISTS allergens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    meal_id INT,
    allergen_name VARCHAR(100),
    FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE
);

-- Donnees initiales pour les categories
INSERT INTO categories (name, description) VALUES
('Entree', 'Entrees et salades fraiches'),
('Plat', 'Plats principaux chauds et equilibres'),
('Dessert', 'Desserts et patisseries'),
('Boisson', 'Boissons chaudes et froides');

-- Donnees initiales pour les plats
INSERT INTO meals (name, description, price, category_id, image_url, available) VALUES
('Salade Caesar', 'Salade verte, poulet grille, parmesan, croûtons, sauce Caesar', 5.50, 1, 'https://images.unsplash.com/photo-1546793665-c74683f339c1', TRUE),
('Soupe du jour', 'Soupe de legumes frais de saison', 3.50, 1, 'https://images.unsplash.com/photo-1547592166-23ac45744acd', TRUE),

('Poulet roti', 'Poulet roti aux herbes avec legumes grilles', 8.90, 2, 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6', TRUE),
('Saumon grille', 'Saumon grille au citron avec riz basmati', 10.50, 2, 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2', TRUE),
('Lasagnes', 'Lasagnes a la bolognaise maison', 7.50, 2, 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3', TRUE),

('Tarte aux pommes', 'Tarte aux pommes maison avec glace vanille', 4.00, 3, 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9', TRUE),
('Mousse au chocolat', 'Mousse au chocolat noir 70%', 3.50, 3, 'https://images.unsplash.com/photo-1541599540903-216a46a7dbf0', TRUE),
('Fruit frais', 'Corbeille de fruits de saison', 2.50, 3, 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b', TRUE),

('Eau minerale', 'Eau minerale 50cl', 1.50, 4, 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d', TRUE),
('Jus d''orange', 'Jus d''orange presse 25cl', 2.50, 4, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba', TRUE),
('Cafe', 'Cafe expresso', 1.20, 4, 'https://images.unsplash.com/photo-1511920170033-f8396924c348', TRUE);

-- Donnees nutritionnelles pour quelques plats
INSERT INTO nutritional_info (meal_id, calories, protein, carbs, fat, fiber, sodium) VALUES
(1, 350, 25.5, 15.2, 22.0, 3.5, 650.0),
(2, 120, 4.0, 18.0, 3.5, 5.0, 450.0),
(3, 480, 45.0, 12.0, 28.0, 4.0, 580.0),
(4, 420, 38.0, 45.0, 18.0, 2.5, 420.0),
(5, 550, 28.0, 48.0, 26.0, 3.8, 720.0),
(6, 320, 4.5, 52.0, 12.0, 2.0, 180.0),
(7, 280, 6.0, 28.0, 18.0, 1.5, 95.0);

-- Allergenes pour quelques plats
INSERT INTO allergens (meal_id, allergen_name) VALUES
(1, 'Gluten'),
(1, 'Lait'),
(1, 'Oeuf'),
(3, 'Moutarde'),
(4, 'Poisson'),
(5, 'Gluten'),
(5, 'Lait'),
(6, 'Gluten'),
(6, 'Oeuf'),
(7, 'Lait'),
(7, 'Oeuf');
