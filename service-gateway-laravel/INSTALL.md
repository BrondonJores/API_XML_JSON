# Installation du Gateway Service Laravel

Ce guide explique comment installer et configurer le Gateway Service Laravel.

## Prérequis

- Docker 20.10+
- Docker Compose 2.0+
- PHP 8.1+ (pour développement local sans Docker)
- Composer 2.0+ (pour développement local sans Docker)
- MySQL 8.0+ (pour développement local sans Docker)

## Option 1 : Installation avec Docker (Recommandé)

### 1. Configuration de l'environnement

Le fichier `.env.example` est déjà configuré avec des valeurs par défaut pour Docker.

```bash
# Copier le fichier d'environnement (optionnel, le script le fait automatiquement)
cp .env.example .env
```

### 2. Démarrage rapide

Utilisez le script de démarrage automatique :

```bash
./start.sh
```

Ce script va :
- Vérifier l'installation de Docker et Docker Compose
- Démarrer les conteneurs (MySQL, Gateway Service, phpMyAdmin)
- Attendre que MySQL soit prêt
- Exécuter les migrations de base de données
- Peupler la base de données avec des données de test

### 3. Services disponibles

Une fois le démarrage terminé :

- **API Gateway** : http://localhost:8000
- **phpMyAdmin** : http://localhost:8080
  - Serveur : `mysql`
  - Utilisateur : `gateway_user`
  - Mot de passe : `gateway_password`

### 4. Comptes de test

Deux comptes sont créés automatiquement :

| Rôle  | Email | Mot de passe |
|-------|-------|--------------|
| Admin | admin@example.com | password |
| User  | user@example.com | password |

### 5. Commandes Docker utiles

```bash
# Voir les logs en temps réel
docker-compose -f docker-compose.local.yml logs -f

# Voir les logs du Gateway uniquement
docker-compose -f docker-compose.local.yml logs -f gateway

# Arrêter les services
docker-compose -f docker-compose.local.yml down

# Arrêter et supprimer les volumes (supprime la base de données)
docker-compose -f docker-compose.local.yml down -v

# Redémarrer un service
docker-compose -f docker-compose.local.yml restart gateway

# Exécuter des commandes Artisan
docker exec gateway-service php artisan migrate
docker exec gateway-service php artisan db:seed
docker exec gateway-service php artisan route:list
```

## Option 2 : Installation locale (sans Docker)

### 1. Installation des dépendances

```bash
composer install
```

### 2. Configuration de l'environnement

```bash
cp .env.example .env
```

Modifiez le fichier `.env` pour configurer votre base de données locale :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gateway_db
DB_USERNAME=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
```

### 3. Génération de la clé d'application

```bash
php artisan key:generate
```

### 4. Création de la base de données

Créez une base de données MySQL nommée `gateway_db` :

```sql
CREATE DATABASE gateway_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Exécution des migrations

```bash
php artisan migrate
```

### 6. Peuplement de la base de données

```bash
php artisan db:seed
```

### 7. Démarrage du serveur

```bash
php artisan serve
```

Le service sera accessible sur http://localhost:8000

## Test de l'installation

### 1. Vérification de santé

```bash
curl http://localhost:8000/api/health
```

Réponse attendue :
```json
{
  "status": "ok",
  "service": "gateway",
  "timestamp": "2024-01-01T12:00:00+00:00"
}
```

### 2. Test de connexion

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password"
  }'
```

### 3. Test d'une route protégée

```bash
# Utilisez le token reçu de la connexion
curl http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

## Configuration des services microservices

Par défaut, le Gateway est configuré pour communiquer avec :

- **Service Menu** : http://service-menu:8080
- **Service Orders** : http://service-orders:5000

Si ces services ne sont pas disponibles, modifiez le fichier `.env` :

```env
MENU_SERVICE_URL=http://localhost:8080
ORDERS_SERVICE_URL=http://localhost:5000
```

## Configuration CORS

Pour autoriser des origines supplémentaires, modifiez le fichier `.env` :

```env
CORS_ALLOWED_ORIGINS="http://localhost:3000,http://localhost:8080,https://votre-frontend.com"
```

## Optimisation pour la production

```bash
# Optimiser l'autoloader
composer install --optimize-autoloader --no-dev

# Mettre en cache la configuration
php artisan config:cache

# Mettre en cache les routes
php artisan route:cache

# Mettre en cache les vues
php artisan view:cache
```

## Dépannage

### Problème : Erreur de connexion à la base de données

**Solution** : Vérifiez que MySQL est démarré et que les informations de connexion dans `.env` sont correctes.

### Problème : Permission denied sur les fichiers storage

**Solution** :
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### Problème : Class not found

**Solution** :
```bash
composer dump-autoload
```

### Problème : Token mismatch

**Solution** :
```bash
php artisan config:clear
php artisan cache:clear
```

## Logs

Les logs de l'application sont stockés dans :
- `storage/logs/laravel.log`

Pour voir les logs en temps réel :
```bash
tail -f storage/logs/laravel.log
```

## Support

Pour toute question ou problème, consultez :
- [README.md](README.md) - Documentation générale
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Documentation de l'API
