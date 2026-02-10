# Structure du Service Gateway Laravel

## Fichiers principaux

### Configuration
- `composer.json` - Dépendances PHP (Laravel 10, Sanctum, Guzzle)
- `.env.example` - Variables d'environnement
- `artisan` - CLI Laravel
- `Dockerfile` - Image PHP 8.1-fpm avec Nginx
- `nginx.conf` - Configuration Nginx
- `docker-entrypoint.sh` - Script de démarrage
- `phpunit.xml` - Configuration des tests

### Application (app/)

#### Controllers (app/Http/Controllers/)
1. `AuthController.php` - Authentification (register, login, logout, me)
2. `ProfileController.php` - Gestion du profil (show, update, allergies, preferences)
3. `ProxyController.php` - Passerelle vers services externes (meals, orders)
4. `AdminController.php` - Administration
5. `Controller.php` - Contrôleur de base

#### Middleware (app/Http/Middleware/)
1. `Authenticate.php` - Authentification Sanctum
2. `AdminMiddleware.php` - Vérification des privilèges admin
3. `EncryptCookies.php` - Chiffrement des cookies
4. `VerifyCsrfToken.php` - Protection CSRF

#### Requests (app/Http/Requests/)
1. `RegisterRequest.php` - Validation inscription
2. `LoginRequest.php` - Validation connexion
3. `ProfileUpdateRequest.php` - Validation mise à jour profil

#### Models (app/Models/)
1. `User.php` - Utilisateur (avec Sanctum)
2. `UserProfile.php` - Profil utilisateur
3. `UserAllergy.php` - Allergies
4. `UserPreference.php` - Préférences

#### Services (app/Services/)
1. `AuthService.php` - Logique d'authentification
2. `MenuClient.php` - Client HTTP pour service Menu (Java)
3. `OrderClient.php` - Client HTTP pour service Orders (Python)

#### Providers (app/Providers/)
1. `AppServiceProvider.php` - Service provider principal
2. `AuthServiceProvider.php` - Autorisation
3. `RouteServiceProvider.php` - Routes et rate limiting

### Base de données (database/)

#### Migrations (database/migrations/)
1. `2024_01_01_000001_create_users_table.php` - Table users
2. `2024_01_01_000002_create_user_profiles_table.php` - Table user_profiles
3. `2024_01_01_000003_create_user_allergies_table.php` - Table user_allergies
4. `2024_01_01_000004_create_user_preferences_table.php` - Table user_preferences
5. `2024_01_01_000005_create_personal_access_tokens_table.php` - Table tokens Sanctum

#### Seeders (database/seeders/)
1. `AdminSeeder.php` - Compte administrateur par défaut
2. `DatabaseSeeder.php` - Seeder principal

### Configuration (config/)
1. `app.php` - Configuration application
2. `auth.php` - Configuration authentification
3. `database.php` - Configuration base de données
4. `services.php` - URLs des services externes
5. `session.php` - Configuration sessions
6. `sanctum.php` - Configuration Sanctum

### Routes (routes/)
1. `api.php` - 11 endpoints REST (tous en français)
2. `web.php` - Routes web
3. `console.php` - Commandes Artisan

## Endpoints API (11 total)

### Authentification (4 endpoints)
1. POST /api/auth/register - Inscription
2. POST /api/auth/login - Connexion
3. POST /api/auth/logout - Déconnexion (auth)
4. GET /api/auth/me - Info utilisateur (auth)

### Profil (4 endpoints)
5. GET /api/profile - Afficher profil (auth)
6. PUT /api/profile - Mettre à jour profil (auth)
7. POST /api/profile/allergies - Gérer allergies (auth)
8. POST /api/profile/preferences - Gérer préférences (auth)

### Passerelle (2 endpoints)
9. ANY /api/gateway/meals/* - Proxy vers Menu Service (auth)
10. ANY /api/gateway/orders/* - Proxy vers Orders Service (auth)

### Santé (1 endpoint)
11. GET /api/health - Vérification de santé

### Administration (bonus)
- GET /api/admin/dashboard - Tableau de bord admin (auth + admin)

## Base de données

### Tables
- `users` - Utilisateurs avec authentification
- `user_profiles` - Profils détaillés
- `user_allergies` - Allergies des utilisateurs
- `user_preferences` - Préférences utilisateur
- `personal_access_tokens` - Tokens Sanctum

### Connexion
- Host: mysql-auth
- Port: 3306
- Database: auth_db (via DB_DATABASE)
- User: auth_user (via DB_USERNAME)
- Password: auth_password (via DB_PASSWORD)

## Services externes

### Menu Service (Java)
- URL: MENU_SERVICE_URL (http://service-menu:8080)
- Authentification transmise via header Authorization

### Orders Service (Python)
- URL: ORDERS_SERVICE_URL (http://service-orders:8000)
- User ID transmis via header X-User-Id

## Caractéristiques

### Sécurité
- Authentification via Laravel Sanctum
- Tokens API pour authentification stateless
- Middleware admin pour routes protégées
- Validation des requêtes via Form Requests
- Protection CSRF

### Architecture
- Pattern Repository via Eloquent ORM
- Service Layer pour logique métier
- HTTP Clients pour communication microservices
- Middleware pour autorisation
- Rate limiting (60 requêtes/minute)

### Commentaires et messages
- Tous en français (comme requis)
- Sans emojis (comme requis)
- Messages d'erreur explicites

## Démarrage

```bash
# Installation des dépendances
composer install

# Configuration
cp .env.example .env
php artisan key:generate

# Migrations et seeders
php artisan migrate --seed

# Démarrage (avec Docker)
docker build -t service-gateway-laravel .
docker run -p 80:80 service-gateway-laravel
```

## Compte admin par défaut
- Email: admin@example.com
- Password: admin123
