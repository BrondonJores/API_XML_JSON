# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2024-01-01

### Ajouté

#### Authentification
- Inscription d'utilisateurs avec validation
- Connexion avec génération de token Sanctum
- Déconnexion avec révocation de tokens
- Endpoint pour récupérer les informations utilisateur
- Middleware d'authentification personnalisé
- Middleware d'autorisation admin

#### Gestion des profils
- CRUD complet pour les profils utilisateurs
- Gestion des allergies (ajout/suppression)
- Gestion des préférences utilisateur (ajout/suppression)
- Support des informations : téléphone, adresse, ville, code postal, pays, date de naissance

#### Proxy vers microservices
- Client HTTP pour le service Menu (Java)
- Client HTTP pour le service Orders (Python)
- Routage automatique des requêtes GET, POST, PUT, DELETE
- Transmission des informations utilisateur dans les en-têtes HTTP
- Support des formats JSON et XML
- Gestion des erreurs et timeouts

#### Base de données
- Migration : table users (utilisateurs)
- Migration : table user_profiles (profils)
- Migration : table user_allergies (allergies)
- Migration : table user_preferences (préférences)
- Migration : table api_logs (journalisation)
- Migration : table personal_access_tokens (tokens Sanctum)
- Seeder avec données de test (admin et utilisateur)

#### Configuration
- Support CORS complet
- Configuration des services externes
- Variables d'environnement pour tous les paramètres
- Configuration des timeouts HTTP
- Support multi-environnement (local, staging, production)

#### Sécurité
- Hash des mots de passe avec bcrypt
- Tokens API sécurisés (Laravel Sanctum)
- Validation des entrées utilisateur
- Protection CSRF
- Protection contre les injections SQL
- Middleware de vérification des permissions

#### Documentation
- README.md complet
- Guide d'installation détaillé (INSTALL.md)
- Documentation complète de l'API (API_DOCUMENTATION.md)
- Guide de test avec exemples (TESTING.md)
- Résumé du projet (PROJECT_SUMMARY.md)
- Commentaires en français dans tout le code

#### Docker
- Dockerfile optimisé pour PHP 8.1-fpm
- Docker Compose pour développement local
- Support MySQL 8.0
- phpMyAdmin pour gestion de la BDD
- Scripts de démarrage automatique (start.sh, init.sh)

#### Développement
- Configuration PHPUnit pour les tests
- Scripts de démarrage rapide
- Configuration des logs
- Support du cache (config, routes, views)

### Caractéristiques techniques

- PHP 8.1
- Laravel 10
- Laravel Sanctum 3.2
- Guzzle HTTP 7.2
- MySQL 8.0
- Docker & Docker Compose

### Notes de version

Cette première version fournit une base solide pour un service de passerelle API :
- Architecture microservices prête
- Authentification et autorisation complètes
- Proxy transparent vers les services backend
- Journalisation de toutes les requêtes
- Documentation exhaustive
- Déploiement Docker simplifié

### Commandes disponibles

```bash
# Démarrage rapide
./start.sh

# Initialisation manuelle
./init.sh

# Migrations
php artisan migrate

# Peuplement
php artisan db:seed

# Tests
php artisan test

# Optimisation
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Comptes de test

- Admin : admin@example.com / password
- User : user@example.com / password

---

## [À venir]

### Prévu pour v1.1.0
- Tests unitaires complets
- Tests d'intégration
- Middleware de rate limiting
- Cache Redis pour les sessions
- Monitoring et métriques
- Support de l'authentification OAuth2
- Websockets pour les notifications temps réel
- API de gestion des logs

### Prévu pour v1.2.0
- Support GraphQL
- Compression des réponses
- Pagination améliorée
- Filtrage et recherche avancés
- Export de données (CSV, Excel)
- API de statistiques
- Dashboard d'administration

### Prévu pour v2.0.0
- Migration vers Laravel 11
- Support de PostgreSQL
- Clustering et haute disponibilité
- Service mesh integration
- Tracing distribué
- Circuit breaker pattern
- Feature flags
