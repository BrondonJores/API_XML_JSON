# Gateway Service Laravel 10 - Projet Complet

## Vue d'ensemble

Le Gateway Service Laravel a été créé avec succès. Ce service agit comme point d'entrée unique pour l'architecture microservices API_XML_JSON.

## Structure du projet

```
service-gateway-laravel/
├── app/                                # Code source de l'application
│   ├── Exceptions/                     # Gestion des exceptions
│   ├── Http/                           # Couche HTTP
│   │   ├── Controllers/                # Contrôleurs API
│   │   │   ├── AuthController.php      # Authentification
│   │   │   ├── ProfileController.php   # Gestion des profils
│   │   │   └── ProxyController.php     # Proxy vers microservices
│   │   ├── Middleware/                 # Middleware HTTP
│   │   │   ├── Authenticate.php        # Authentification
│   │   │   └── AdminMiddleware.php     # Vérification admin
│   │   └── Kernel.php                  # Configuration HTTP
│   ├── Models/                         # Modèles Eloquent
│   │   ├── User.php                    # Utilisateur
│   │   ├── UserProfile.php             # Profil utilisateur
│   │   ├── UserAllergy.php             # Allergies
│   │   └── UserPreference.php          # Préférences
│   ├── Providers/                      # Fournisseurs de services
│   └── Services/                       # Services métier
│       ├── AuthService.php             # Logique d'authentification
│       ├── MenuClient.php              # Client HTTP Menu
│       └── OrderClient.php             # Client HTTP Orders
├── bootstrap/                          # Fichiers de démarrage
├── config/                             # Configuration
│   ├── app.php                         # Configuration app
│   ├── database.php                    # Configuration BDD
│   ├── services.php                    # Services externes
│   ├── sanctum.php                     # Laravel Sanctum
│   └── cors.php                        # Configuration CORS
├── database/                           # Base de données
│   ├── migrations/                     # Migrations
│   │   ├── create_users_table.php
│   │   ├── create_user_profiles_table.php
│   │   ├── create_user_allergies_table.php
│   │   ├── create_user_preferences_table.php
│   │   ├── create_api_logs_table.php
│   │   └── create_personal_access_tokens_table.php
│   └── seeders/                        # Données de test
│       └── DatabaseSeeder.php
├── public/                             # Point d'entrée web
│   └── index.php
├── routes/                             # Définition des routes
│   ├── api.php                         # Routes API
│   └── console.php                     # Commandes console
├── storage/                            # Stockage (logs, cache)
├── .env.example                        # Template environnement
├── composer.json                       # Dépendances PHP
├── Dockerfile                          # Image Docker
├── docker-compose.local.yml            # Configuration Docker Compose
├── init.sh                             # Script d'initialisation
├── start.sh                            # Script de démarrage rapide
├── README.md                           # Documentation principale
├── API_DOCUMENTATION.md                # Documentation API
├── INSTALL.md                          # Guide d'installation
└── TESTING.md                          # Guide de test
```

## Fonctionnalités implémentées

### ✅ Authentification et autorisation
- Inscription d'utilisateurs
- Connexion avec génération de token (Laravel Sanctum)
- Déconnexion
- Récupération des informations utilisateur
- Middleware d'authentification
- Middleware admin

### ✅ Gestion des profils
- Consultation du profil
- Mise à jour du profil (nom, téléphone, adresse, etc.)
- Gestion des allergies (ajout/suppression)
- Gestion des préférences (ajout/suppression)

### ✅ Proxy vers microservices
- Routage automatique vers le service Menu (Java)
- Routage automatique vers le service Orders (Python)
- Transmission des informations utilisateur dans les en-têtes
- Support des méthodes HTTP : GET, POST, PUT, DELETE
- Gestion des formats JSON et XML

### ✅ Journalisation
- Enregistrement de toutes les requêtes API
- Stockage des informations : service, méthode, path, user_id, IP, user agent

### ✅ Configuration
- Support CORS configuré
- Variables d'environnement pour les services externes
- Configuration des timeouts
- Gestion des sessions
- Cache configuré

### ✅ Base de données
- 6 tables avec relations
- Migrations complètes
- Seeder avec données de test
- Support MySQL

### ✅ Docker
- Dockerfile optimisé pour production
- Docker Compose pour développement local
- Support MySQL
- phpMyAdmin inclus

### ✅ Documentation
- README complet
- Documentation API détaillée
- Guide d'installation
- Guide de test avec exemples
- Commentaires en français dans tout le code

## Technologies utilisées

- **PHP** : 8.1
- **Framework** : Laravel 10
- **Authentification** : Laravel Sanctum
- **Base de données** : MySQL 8.0
- **HTTP Client** : Guzzle
- **Containerisation** : Docker & Docker Compose
- **Tests** : PHPUnit

## Endpoints disponibles

### Publics
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Protégés (authentification requise)
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/me` - Informations utilisateur
- `GET /api/profile` - Profil utilisateur
- `PUT /api/profile` - Mise à jour profil
- `POST /api/profile/allergies` - Ajouter allergie
- `DELETE /api/profile/allergies/{id}` - Supprimer allergie
- `POST /api/profile/preferences` - Ajouter préférence
- `DELETE /api/profile/preferences/{id}` - Supprimer préférence
- `ANY /api/menu/*` - Proxy vers Menu Service
- `ANY /api/orders/*` - Proxy vers Orders Service

### Utilitaires
- `GET /api/health` - Health check

## Démarrage rapide

### Avec Docker (recommandé)
```bash
./start.sh
```

### Sans Docker
```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

## Comptes de test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | admin@example.com | password |
| User | user@example.com | password |

## URLs de développement

- **API Gateway** : http://localhost:8000
- **phpMyAdmin** : http://localhost:8080

## Configuration des microservices

Modifier dans `.env` :
```env
MENU_SERVICE_URL=http://service-menu:8080
ORDERS_SERVICE_URL=http://service-orders:5000
```

## Sécurité

- ✅ Mots de passe hashés avec bcrypt
- ✅ Tokens API sécurisés (Sanctum)
- ✅ Validation des entrées
- ✅ Protection CSRF
- ✅ Protection contre les injections SQL (Eloquent ORM)
- ✅ CORS configuré
- ✅ Middleware d'authentification et d'autorisation

## Performance

- Cache de configuration
- Cache de routes
- Autoloader optimisé
- Compression des assets
- Connexions HTTP persistantes

## Extensibilité

Le service est conçu pour être facilement extensible :
- Ajout de nouveaux contrôleurs
- Ajout de nouveaux services clients
- Ajout de middleware personnalisés
- Ajout de nouvelles tables/modèles
- Support de nouveaux formats de données

## Points d'attention

1. **Sans Composer** : Les dépendances doivent être installées avec `composer install`
2. **Clé d'application** : Doit être générée avec `php artisan key:generate`
3. **Services externes** : Les URLs des services Menu et Orders doivent être configurées
4. **Permissions** : Les dossiers `storage/` et `bootstrap/cache/` doivent être accessibles en écriture

## Prochaines étapes

Pour intégrer ce service dans l'architecture complète :

1. Démarrer le service Menu (Java)
2. Démarrer le service Orders (Python)
3. Configurer les URLs dans `.env`
4. Démarrer le frontend React
5. Tester l'intégration complète

## Support

Consultez la documentation :
- [README.md](README.md) - Vue d'ensemble
- [INSTALL.md](INSTALL.md) - Installation détaillée
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API complète
- [TESTING.md](TESTING.md) - Tests et exemples

---

**Note** : Tous les commentaires dans le code sont en français, aucun emoji n'est utilisé, et le code suit les conventions Laravel.
