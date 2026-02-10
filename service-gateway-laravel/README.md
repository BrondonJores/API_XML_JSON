# Service Gateway Laravel

Service d'authentification et de passerelle API pour l'architecture microservices.

## Caractéristiques

- Authentification via Laravel Sanctum
- Gestion des profils utilisateurs
- Gestion des allergies et préférences
- Proxy vers les services Menu et Orders
- Interface administrateur

## Installation

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
```

## Endpoints API

### Authentification
- POST /api/auth/register - Inscription
- POST /api/auth/login - Connexion
- POST /api/auth/logout - Déconnexion
- GET /api/auth/me - Informations utilisateur

### Profil
- GET /api/profile - Afficher le profil
- PUT /api/profile - Mettre à jour le profil
- POST /api/profile/allergies - Gérer les allergies
- POST /api/profile/preferences - Gérer les préférences

### Passerelle
- ANY /api/gateway/meals/* - Proxy vers le service Menu
- ANY /api/gateway/orders/* - Proxy vers le service Orders

### Santé
- GET /api/health - Vérification de santé

## Configuration

Les variables d'environnement requises :
- DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
- MENU_SERVICE_URL
- ORDERS_SERVICE_URL

## Docker

```bash
docker build -t service-gateway-laravel .
docker run -p 80:80 service-gateway-laravel
```
