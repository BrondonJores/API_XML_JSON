-- Base de donnees pour le service authentification
CREATE DATABASE IF NOT EXISTS canteen_auth CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE canteen_auth;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table des profils utilisateurs
CREATE TABLE IF NOT EXISTS user_profiles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNIQUE,
    budget DECIMAL(10,2) DEFAULT 0,
    spent_this_month DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table des allergies utilisateurs
CREATE TABLE IF NOT EXISTS user_allergies (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    allergen VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table des preferences utilisateurs
CREATE TABLE IF NOT EXISTS user_preferences (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    preference VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table des logs API
CREATE TABLE IF NOT EXISTS api_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    endpoint VARCHAR(500),
    method VARCHAR(10),
    status_code INT,
    response_time_ms INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Utilisateur administrateur par defaut
-- Mot de passe: password (hache avec bcrypt)
INSERT INTO users (name, email, password, role) VALUES
('Administrateur', 'admin@canteen.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Profil pour l'administrateur
INSERT INTO user_profiles (user_id, budget, spent_this_month) VALUES
(1, 1000.00, 0.00);

-- Index pour ameliorer les performances
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_allergies_user_id ON user_allergies(user_id);
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
