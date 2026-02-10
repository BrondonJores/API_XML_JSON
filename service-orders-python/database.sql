-- Script de creation de la base de donnees pour le Service Orders

-- Creation de la base de donnees
CREATE DATABASE IF NOT EXISTS canteen_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE canteen_db;

-- Table des commandes
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    pickup_time DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des articles de commande
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    meal_id INT NOT NULL,
    meal_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id),
    INDEX idx_meal_id (meal_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table de la file d'attente
CREATE TABLE IF NOT EXISTS queue (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(50) DEFAULT 'waiting',
    position INT,
    estimated_time INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_order_id (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Donnees de test
-- Commande 1
INSERT INTO orders (user_id, total, status, pickup_time, created_at) VALUES
(1, 25.00, 'pending', '2024-02-10 12:30:00', NOW());

INSERT INTO order_items (order_id, meal_id, meal_name, quantity, price) VALUES
(1, 1, 'Poulet roti', 2, 12.50);

INSERT INTO queue (order_id, user_id, status, position, estimated_time) VALUES
(1, 1, 'waiting', 1, 5);

-- Commande 2
INSERT INTO orders (user_id, total, status, pickup_time, created_at) VALUES
(2, 18.50, 'preparing', '2024-02-10 12:45:00', NOW());

INSERT INTO order_items (order_id, meal_id, meal_name, quantity, price) VALUES
(2, 2, 'Salade Cesar', 1, 8.50),
(2, 3, 'Tarte aux pommes', 1, 10.00);

INSERT INTO queue (order_id, user_id, status, position, estimated_time) VALUES
(2, 2, 'preparing', 2, 10);

-- Commande 3
INSERT INTO orders (user_id, total, status, created_at) VALUES
(1, 15.00, 'completed', NOW() - INTERVAL 1 DAY);

INSERT INTO order_items (order_id, meal_id, meal_name, quantity, price) VALUES
(3, 1, 'Poulet roti', 1, 12.50),
(3, 4, 'Eau minerale', 1, 2.50);

INSERT INTO queue (order_id, user_id, status) VALUES
(3, 1, 'completed');

-- Affichage des donnees inserees
SELECT 'Orders:' as '';
SELECT * FROM orders;

SELECT 'Order Items:' as '';
SELECT * FROM order_items;

SELECT 'Queue:' as '';
SELECT * FROM queue;
