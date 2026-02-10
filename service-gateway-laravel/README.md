# Service Gateway Laravel

Service d'authentification et de passerelle API développé avec Laravel 10 pour l'architecture microservices de gestion de cantine.

## Description

Ce service agit comme une passerelle API centralisée pour l'architecture microservices. Il gère :
- L'authentification et l'autorisation des utilisateurs via Laravel Sanctum
- La gestion des profils utilisateurs avec allergies et préférences
- Le routage des requêtes vers les microservices (menus et commandes)
- La centralisation des endpoints API

## Prérequis

- PHP >= 8.1
- Composer
- MySQL >= 5.7
- Docker et Docker Compose (pour le déploiement)

## Installation locale

### Installation manuelle

```bash
# Installer les dépendances PHP
composer install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application Laravel
php artisan key:generate

# Configurer la base de données dans .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=canteen_auth
# DB_USERNAME=root
# DB_PASSWORD=

# Créer la base de données
mysql -u root -p < init.sql

# Exécuter les migrations
php artisan migrate

# Démarrer le serveur de développement
php artisan serve
```

Le service sera accessible à l'adresse : http://localhost:8000

### Installation avec Docker

```bash
# Construire l'image Docker
docker build -t service-gateway-laravel .

# Lancer le conteneur
docker run -d -p 8000:8000 \
  -e DB_HOST=mysql \
  -e DB_DATABASE=canteen_auth \
  -e DB_USERNAME=root \
  -e DB_PASSWORD=secret \
  -e MENU_SERVICE_URL=http://service-menu-java:8080 \
  -e ORDERS_SERVICE_URL=http://service-orders-python:5000 \
  --name gateway-service \
  service-gateway-laravel
```

## Configuration

### Variables d'environnement

Configurer les variables suivantes dans le fichier `.env` :

```env
# Configuration de l'application
APP_NAME=Gateway
APP_ENV=production
APP_KEY=base64:...
APP_DEBUG=false
APP_URL=http://localhost:8000

# Configuration de la base de données
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=canteen_auth
DB_USERNAME=root
DB_PASSWORD=secret

# URLs des microservices
MENU_SERVICE_URL=http://service-menu-java:8080
ORDERS_SERVICE_URL=http://service-orders-python:5000

# Configuration de Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost,127.0.0.1
```

## Points de terminaison API

### Routes publiques

#### Santé du service
```
GET /api/health
```
Vérification de l'état du service (pas d'authentification requise).

**Réponse :**
```json
{
  "status": "ok",
  "service": "gateway",
  "timestamp": "2024-01-01T12:00:00.000000Z"
}
```

### Routes d'authentification

#### Inscription
```
POST /api/auth/register
```
Création d'un nouveau compte utilisateur avec profil.

**Corps de la requête :**
```json
{
  "name": "Jean Dupont",
  "email": "jean.dupont@example.com",
  "password": "motdepasse123",
  "password_confirmation": "motdepasse123"
}
```

**Réponse (201) :**
```json
{
  "message": "Utilisateur créé avec succès",
  "user": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "jean.dupont@example.com"
  },
  "token": "1|AbCdEfGhIjKlMnOpQrStUvWxYz..."
}
```

#### Connexion
```
POST /api/auth/login
```
Authentification d'un utilisateur existant.

**Corps de la requête :**
```json
{
  "email": "jean.dupont@example.com",
  "password": "motdepasse123"
}
```

**Réponse (200) :**
```json
{
  "message": "Connexion réussie",
  "user": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "jean.dupont@example.com"
  },
  "token": "1|AbCdEfGhIjKlMnOpQrStUvWxYz..."
}
```

### Routes protégées (authentification requise)

**Note :** Toutes les routes suivantes nécessitent un header d'authentification :
```
Authorization: Bearer {token}
```

#### Déconnexion
```
POST /api/auth/logout
```
Révocation du token d'authentification actuel.

**Réponse (200) :**
```json
{
  "message": "Déconnexion réussie"
}
```

#### Informations utilisateur
```
GET /api/auth/me
```
Récupération des informations de l'utilisateur authentifié.

**Réponse (200) :**
```json
{
  "user": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "jean.dupont@example.com",
    "profile": {
      "id": 1,
      "user_id": 1,
      "dietary_restrictions": "Végétarien",
      "favorite_cuisine": "Italienne"
    }
  }
}
```

### Routes de profil (authentification requise)

#### Afficher le profil
```
GET /api/profile
```
Récupération du profil avec allergies et préférences.

**Réponse (200) :**
```json
{
  "profile": {
    "id": 1,
    "user_id": 1,
    "dietary_restrictions": "Végétarien",
    "favorite_cuisine": "Italienne",
    "phone": "+33612345678",
    "address": "123 Rue Example",
    "allergies": [...],
    "preferences": [...]
  }
}
```

#### Mettre à jour le profil
```
PUT /api/profile
```
Modification des informations du profil utilisateur.

**Corps de la requête :**
```json
{
  "dietary_restrictions": "Végétalien",
  "favorite_cuisine": "Asiatique",
  "phone": "+33612345678",
  "address": "123 Rue Example"
}
```

**Réponse (200) :**
```json
{
  "message": "Profil mis à jour avec succès",
  "profile": {...}
}
```

#### Gérer les allergies
```
POST /api/profile/allergies
```
Ajout ou suppression d'allergies au profil.

**Corps de la requête :**
```json
{
  "action": "add",
  "allergy_ids": [1, 2, 3]
}
```

**Réponse (200) :**
```json
{
  "message": "Allergies ajoutées avec succès",
  "allergies": [...]
}
```

#### Gérer les préférences
```
POST /api/profile/preferences
```
Ajout ou suppression de préférences au profil.

**Corps de la requête :**
```json
{
  "action": "add",
  "preference_ids": [1, 2, 3]
}
```

**Réponse (200) :**
```json
{
  "message": "Préférences ajoutées avec succès",
  "preferences": [...]
}
```

### Routes de passerelle (authentification requise)

#### Proxy vers le service de menus
```
ANY /api/gateway/meals/{path}
```
Redirige toutes les requêtes vers le service de menus (Java).

**Exemples :**
- `GET /api/gateway/meals` - Liste des menus
- `GET /api/gateway/meals/1` - Détails d'un menu
- `POST /api/gateway/meals` - Création d'un menu

#### Proxy vers le service de commandes
```
ANY /api/gateway/orders/{path}
```
Redirige toutes les requêtes vers le service de commandes (Python).

**Exemples :**
- `GET /api/gateway/orders` - Liste des commandes
- `POST /api/gateway/orders` - Création d'une commande
- `GET /api/gateway/orders/1` - Détails d'une commande

## Architecture

### Vue d'ensemble

Ce service fait partie d'une architecture microservices composée de :

1. **Service Gateway (Laravel)** - Ce service
   - Authentification et autorisation
   - Gestion des profils utilisateurs
   - Routage des requêtes vers les autres services

2. **Service Menu (Java/Spring Boot)**
   - Gestion des menus et plats
   - Gestion des catégories et ingrédients

3. **Service Orders (Python/Flask)**
   - Gestion des commandes
   - Suivi des statuts de commande

### Flux de communication

```
Client → Gateway (Auth) → Service Menu/Orders
```

Le Gateway vérifie l'authentification puis transmet les requêtes aux services appropriés avec le token d'authentification.

## Modèle de données

### Utilisateurs (users)
- id, name, email, password
- timestamps

### Profils (profiles)
- id, user_id, dietary_restrictions, favorite_cuisine, phone, address
- timestamps

### Relations
- Un utilisateur possède un profil
- Un profil peut avoir plusieurs allergies
- Un profil peut avoir plusieurs préférences

## Technologies utilisées

- **Laravel 10** - Framework PHP
- **Laravel Sanctum** - Authentification API avec tokens
- **Guzzle HTTP** - Client HTTP pour les appels aux microservices
- **MySQL** - Base de données relationnelle
- **Docker** - Conteneurisation
- **Composer** - Gestionnaire de dépendances PHP

## Développement

### Structure du projet

```
service-gateway-laravel/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php      # Gestion de l'authentification
│   │   │   ├── ProfileController.php   # Gestion des profils
│   │   │   └── ProxyController.php     # Proxy vers microservices
│   │   └── Middleware/
│   └── Models/
│       ├── User.php                    # Modèle utilisateur
│       ├── UserProfile.php             # Modèle profil
│       ├── UserAllergy.php             # Modèle allergies
│       └── UserPreference.php          # Modèle préférences
├── database/
│   └── migrations/                     # Migrations de base de données
├── routes/
│   └── api.php                         # Définition des routes API
├── Dockerfile                          # Configuration Docker
├── init.sql                            # Initialisation base de données
└── README.md                           # Cette documentation

```

### Tests

```bash
# Exécuter les tests unitaires
php artisan test

# Tests avec couverture
php artisan test --coverage
```

### Débogage

```bash
# Activer le mode debug dans .env
APP_DEBUG=true

# Consulter les logs
tail -f storage/logs/laravel.log
```

## Déploiement

### Avec Docker Compose

Le service est configuré pour fonctionner avec Docker Compose dans le fichier racine du projet.

```bash
# Démarrer tous les services
docker-compose up -d

# Consulter les logs
docker-compose logs -f gateway

# Arrêter les services
docker-compose down
```

### Variables d'environnement de production

Pour un déploiement en production, assurez-vous de configurer :
- `APP_ENV=production`
- `APP_DEBUG=false`
- `DB_PASSWORD` avec un mot de passe sécurisé
- URLs correctes des microservices
- Configuration HTTPS/SSL

## Sécurité

### Authentification
- Utilisation de Laravel Sanctum pour les tokens API
- Tokens révocables à la déconnexion
- Hash bcrypt pour les mots de passe

### Bonnes pratiques
- Validation stricte des entrées utilisateur
- Protection CSRF désactivée pour l'API
- Rate limiting sur les routes sensibles
- CORS configuré pour les domaines autorisés

## Dépannage

### Erreur de connexion à la base de données
Vérifier les variables d'environnement `DB_*` dans `.env`.

### Erreur 401 Unauthorized
Vérifier que le token Bearer est correctement envoyé dans le header `Authorization`.

### Erreur 503 Service Unavailable
Vérifier que les services Menu et Orders sont démarrés et accessibles.

### Erreur de migration
```bash
# Réinitialiser la base de données
php artisan migrate:fresh

# Réexécuter les migrations
php artisan migrate:refresh
```

## Licence

Ce projet est développé dans le cadre d'une architecture de microservices pour la gestion de cantine.

## Contact

Pour toute question ou problème, veuillez contacter l'équipe de développement.
