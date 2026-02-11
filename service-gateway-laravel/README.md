# Service Gateway - Laravel 12

Service de passerelle pour l'architecture microservices Canteen.

## Description

Ce service agit comme point d'entrée unique pour les applications clientes, gérant :
- Authentification et autorisation via Laravel Sanctum 4.0
- Routage des requêtes vers les microservices appropriés (Menu et Orders)
- Gestion des profils utilisateurs avec budget
- Gestion des allergies et préférences alimentaires

## Technologies

- PHP 8.2
- Laravel 12
- MySQL 8.0
- Laravel Sanctum 4.0 (authentification API)
- Guzzle HTTP Client 7.8 (proxy vers autres services)
- Docker

## Architecture

Le Gateway Service communique avec :
- **Service Menu** (Java) : Gestion du menu et des éléments via `http://service-menu:8080`
- **Service Orders** (Python) : Gestion des commandes via `http://service-orders:5000`

## Installation

### Prérequis

- Docker et Docker Compose
- PHP 8.2
- Composer
- MySQL 8.0

### Installation locale

1. Cloner le repository
```bash
git clone <repository-url>
cd service-gateway-laravel
```

2. Copier le fichier d'environnement
```bash
cp .env.example .env
```

3. Installer les dépendances
```bash
composer install
```

4. Générer la clé d'application
```bash
php artisan key:generate
```

5. Exécuter les migrations
```bash
php artisan migrate
```

6. Créer l'administrateur par défaut
```bash
php artisan db:seed --class=AdminSeeder
```

### Installation avec Docker

```bash
docker-compose up -d
docker-compose exec gateway php artisan migrate
docker-compose exec gateway php artisan db:seed --class=AdminSeeder
```

## Configuration

### Variables d'environnement

Configurez les variables suivantes dans votre fichier `.env` :

```env
APP_NAME="Canteen Gateway"
APP_ENV=production
APP_DEBUG=false
APP_URL=http://localhost:8003

DB_CONNECTION=mysql
DB_HOST=mysql-auth
DB_PORT=3306
DB_DATABASE=canteen_auth
DB_USERNAME=root
DB_PASSWORD=root123

MENU_SERVICE_URL=http://service-menu:8080
ORDERS_SERVICE_URL=http://service-orders:5000

SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

## Endpoints API

### Authentification

#### Inscription
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

#### Connexion
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Réponse :
```json
{
  "message": "Connexion réussie",
  "data": {
    "user": { ... },
    "token": "1|xxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### Déconnexion
```bash
POST /api/auth/logout
Authorization: Bearer {token}
```

#### Informations utilisateur connecté
```bash
GET /api/auth/me
Authorization: Bearer {token}
```

### Profil utilisateur

#### Voir le profil
```bash
GET /api/profile
Authorization: Bearer {token}
```

#### Modifier le profil
```bash
PUT /api/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "budget": 150.00
}
```

#### Gérer les allergies
```bash
POST /api/profile/allergies
Authorization: Bearer {token}
Content-Type: application/json

{
  "allergies": ["gluten", "lactose", "arachides"]
}
```

#### Gérer les préférences
```bash
POST /api/profile/preferences
Authorization: Bearer {token}
Content-Type: application/json

{
  "preferences": ["végétarien", "sans gluten", "bio"]
}
```

### Proxy vers les microservices

#### Accès au service Menu
```bash
ANY /api/gateway/menu/{path}
Authorization: Bearer {token}

Exemples :
GET /api/gateway/menu/items
POST /api/gateway/menu/items
```

#### Accès au service Orders
```bash
ANY /api/gateway/orders/{path}
Authorization: Bearer {token}

Exemples :
GET /api/gateway/orders/history
POST /api/gateway/orders/create
```

### Health Check

```bash
GET /api/health
```

Réponse :
```json
{
  "status": "ok",
  "service": "gateway"
}
```

## Authentification

Le service utilise Laravel Sanctum pour l'authentification API :

1. Obtenez un token via `/api/auth/login`
2. Incluez le token dans l'en-tête Authorization de vos requêtes :
```
Authorization: Bearer {votre-token}
```

## Modèles de données

### User
- `id` : Identifiant unique
- `name` : Nom de l'utilisateur
- `email` : Adresse email (unique)
- `password` : Mot de passe hashé
- `role` : Rôle (user/admin)

### UserProfile
- `id` : Identifiant unique
- `user_id` : Référence vers l'utilisateur
- `budget` : Budget mensuel
- `spent_this_month` : Montant dépensé ce mois

### UserAllergy
- `id` : Identifiant unique
- `user_id` : Référence vers l'utilisateur
- `allergen` : Nom de l'allergène

### UserPreference
- `id` : Identifiant unique
- `user_id` : Référence vers l'utilisateur
- `preference` : Préférence alimentaire

## Structure du projet

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
│   │   └── Requests/
│   │       ├── RegisterRequest.php
│   │       ├── LoginRequest.php
│   │       └── ProfileUpdateRequest.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── UserProfile.php
│   │   ├── UserAllergy.php
│   │   └── UserPreference.php
│   ├── Services/
│   │   ├── AuthService.php
│   │   ├── MenuClient.php
│   │   └── OrderClient.php
│   └── Exceptions/
│       └── Handler.php
├── bootstrap/
│   └── app.php
├── config/
├── database/
│   ├── migrations/
│   └── seeders/
│       └── AdminSeeder.php
├── routes/
│   ├── api.php
│   └── console.php
├── .env.example
├── composer.json
├── Dockerfile
└── README.md
```

## Sécurité

- Tous les mots de passe sont hashés avec bcrypt
- Les tokens d'authentification sont gérés par Laravel Sanctum
- Validation des entrées utilisateur via Form Requests
- Protection CSRF pour les requêtes stateful

## Administration

Un compte administrateur par défaut est créé lors du seeding :
- Email : `admin@canteen.com`
- Mot de passe : `admin123`

**Important** : Changez ce mot de passe en production !

## Tests

```bash
php artisan test
```

## Logs

Les logs sont stockés dans `storage/logs/laravel.log`

## Support

Pour toute question ou problème, veuillez créer une issue sur le repository.

## Licence

MIT

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
