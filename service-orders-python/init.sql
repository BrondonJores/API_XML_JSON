-- Script d'initialisation de la base de donnees pour le service de commandes

-- Creation de la base de donnees
CREATE DATABASE IF NOT EXISTS canteen_orders;
USE canteen_orders;

-- Table des commandes
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    total_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des articles de commande
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    meal_id INT NOT NULL,
    meal_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id),
    INDEX idx_meal_id (meal_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table de la file d'attente
CREATE TABLE IF NOT EXISTS queue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    position INT NOT NULL,
    estimated_time INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'waiting',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_position (position),
    INDEX idx_status (status),
    UNIQUE KEY unique_order (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertion de donnees d'exemple pour les commandes
INSERT INTO orders (customer_name, status, total_price) VALUES
('Jean Dupont', 'pending', 25.50),
('Marie Martin', 'preparing', 18.75),
('Pierre Durand', 'ready', 32.00),
('Sophie Bernard', 'completed', 15.25);

-- Insertion de donnees d'exemple pour les articles de commande
INSERT INTO order_items (order_id, meal_id, meal_name, quantity, price) VALUES
(1, 1, 'Burger Classique', 1, 12.50),
(1, 3, 'Frites', 2, 6.50),
(2, 2, 'Pizza Margherita', 1, 15.00),
(2, 5, 'Salade Cesar', 1, 3.75),
(3, 4, 'Pasta Carbonara', 2, 16.00),
(4, 6, 'Sandwich Poulet', 1, 8.50),
(4, 7, 'Jus d''Orange', 1, 6.75);

-- Insertion de donnees d'exemple pour la file d'attente
INSERT INTO queue (order_id, position, estimated_time, status) VALUES
(1, 1, 10, 'waiting'),
(2, 2, 15, 'preparing'),
(3, 3, 5, 'ready');
