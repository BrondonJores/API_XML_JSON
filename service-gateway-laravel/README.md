# Gateway Service - Laravel 10

Service de passerelle pour l'architecture microservices API_XML_JSON.

## Description

Ce service agit comme point d'entrée unique pour les applications clientes, gérant :
- Authentification et autorisation via Laravel Sanctum
- Routage des requêtes vers les microservices appropriés
- Gestion des profils utilisateurs
- Journalisation des requêtes API

## Architecture

Le Gateway Service communique avec :
- **Service Menu** (Java) : Gestion du menu et des éléments
- **Service Orders** (Python) : Gestion des commandes

## Technologies

- PHP 8.1
- Laravel 10
- MySQL 8.0
- Laravel Sanctum (authentification API)
- Guzzle HTTP (client HTTP)
- Docker

## Structure

```
service-gateway-laravel/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── ProfileController.php
│   │   │   └── ProxyController.php
│   │   ├── Middleware/
│   │   │   ├── Authenticate.php
│   │   │   └── AdminMiddleware.php
│   │   └── Kernel.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── UserProfile.php
│   │   ├── UserAllergy.php
│   │   └── UserPreference.php
│   └── Services/
│       ├── AuthService.php
│       ├── MenuClient.php
│       └── OrderClient.php
├── config/
├── database/
│   ├── migrations/
│   └── seeders/
├── public/
├── routes/
│   └── api.php
├── .env.example
├── composer.json
├── Dockerfile
└── docker-compose.local.yml
```

## Installation

### Prérequis
- Docker et Docker Compose
- PHP 8.1+ (pour développement local)
- Composer

### Configuration

1. Copier le fichier d'environnement :
```bash
cp .env.example .env
```

2. Installer les dépendances :
```bash
composer install
```

3. Générer la clé d'application :
```bash
php artisan key:generate
```

4. Exécuter les migrations :
```bash
php artisan migrate
```

5. Peupler la base de données (optionnel) :
```bash
php artisan db:seed
```

## Démarrage avec Docker

### Développement local
```bash
docker-compose -f docker-compose.local.yml up -d
```

Le service sera accessible sur `http://localhost:8000`

### Production
```bash
docker build -t gateway-service .
docker run -p 8000:8000 gateway-service
```

## API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion (authentifié)
- `GET /api/auth/me` - Informations utilisateur (authentifié)

### Profil
- `GET /api/profile` - Récupérer le profil
- `PUT /api/profile` - Mettre à jour le profil
- `POST /api/profile/allergies` - Ajouter une allergie
- `DELETE /api/profile/allergies/{id}` - Supprimer une allergie
- `POST /api/profile/preferences` - Ajouter une préférence
- `DELETE /api/profile/preferences/{id}` - Supprimer une préférence

### Proxy Menu Service
- `GET /api/menu/*` - Redirection vers le service Menu
- `POST /api/menu/*` - Redirection vers le service Menu

### Proxy Orders Service
- `GET /api/orders/*` - Redirection vers le service Orders
- `POST /api/orders/*` - Redirection vers le service Orders

## Variables d'environnement

Voir `.env.example` pour la liste complète des variables.

Variables importantes :
- `DB_*` : Configuration de la base de données
- `MENU_SERVICE_URL` : URL du service Menu
- `ORDERS_SERVICE_URL` : URL du service Orders
- `CORS_ALLOWED_ORIGINS` : Origines autorisées pour CORS

## Développement

### Exécuter les tests
```bash
php artisan test
```

### Formater le code
```bash
./vendor/bin/pint
```

### Voir les logs
```bash
tail -f storage/logs/laravel.log
```

## Sécurité

- Authentification via Laravel Sanctum (tokens API)
- Middleware d'authentification sur les routes protégées
- Middleware d'administration pour les routes admin
- Validation des entrées utilisateur
- Protection CORS configurée

## Licence

MIT
