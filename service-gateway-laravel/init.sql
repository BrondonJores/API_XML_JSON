-- Script d'initialisation de la base de données MySQL pour le service Gateway
-- Ce script crée la base de données et insère un utilisateur administrateur par défaut

-- Création de la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS canteen_auth CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Utilisation de la base de données
USE canteen_auth;

-- Insertion d'un utilisateur administrateur par défaut
-- Note: Ce script sera exécuté avant les migrations Laravel
-- L'utilisateur admin sera créé avec le mot de passe 'admin123'
-- Hash bcrypt pour 'admin123': $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi

-- Attendre que les migrations soient exécutées avant d'insérer les données
-- Cette section sera exécutée par un script séparé après les migrations
-- INSERT INTO users (name, email, email_verified_at, password, created_at, updated_at)
-- VALUES (
--     'Administrateur',
--     'admin@canteen.local',
--     NOW(),
--     '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
--     NOW(),
--     NOW()
-- );
