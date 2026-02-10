# Système de Cantine Intelligente

## Description

Système complet de gestion de cantine intelligente avec architecture microservices moderne, support XML/JSON, et interfaces web professionnelles. Projet niveau DUT 2ème année.

## Architecture

Le système est composé de 4 microservices indépendants:

### 1. Service Menu (Java EE + Maven) - Port 8001
- Gestion des plats et catégories
- Informations nutritionnelles et allergènes
- Export/Import XML/JSON
- Validation XSD
- Transformations XSLT
- 14 endpoints REST

### 2. Service Commandes (Python Flask) - Port 8002
- Gestion des commandes
- File d'attente intelligente
- Système de recommandations
- Conversion XML/JSON
- Validation schemas
- Transformations XSLT
- 14 endpoints REST

### 3. Service Gateway (Laravel PHP) - Port 8003
- Authentification et autorisation
- Gestion des profils utilisateurs
- Proxy API Gateway
- Gestion allergies et préférences
- 11 endpoints REST

### 4. Frontend (React + Vite) - Port 3000
- Interface utilisateur moderne
- 21 pages complètes
- 40+ composants réutilisables
- Tailwind CSS
- Gestion d'état Zustand

## Technologies Utilisées

### Backend
- **Java 11** avec Servlets 4.0, JDBC, Maven
- **Python 3.9** avec Flask, PyMySQL, lxml
- **PHP 8.1** avec Laravel 10, Sanctum, Eloquent
- **MySQL 8.0** (3 bases de données séparées)

### Frontend
- **React 18** avec Vite
- **Tailwind CSS 3**
- **React Router DOM 6**
- **Axios** pour les appels API
- **Zustand** pour la gestion d'état
- **Chart.js** pour les graphiques

### XML/JSON
- **JAXB** (Java)
- **Gson** (Java)
- **Saxon** (XSLT Java)
- **lxml** (Python)
- **xmlschema** (Python)
- **jsonschema** (Python)

## Prérequis

- Docker 20.10+
- Docker Compose 1.29+
- 8 Go RAM minimum
- Ports disponibles: 3000, 8001, 8002, 8003, 3306, 3307, 3308

## Installation et Démarrage

### Démarrage Rapide

```bash
# Cloner le dépôt
git clone https://github.com/BrondonJores/API_XML_JSON.git
cd API_XML_JSON

# Démarrer tous les services
docker-compose up -d

# Vérifier l'état des services
docker-compose ps
```

### Accès aux Services

- **Frontend**: http://localhost:3000
- **Service Menu**: http://localhost:8001/api
- **Service Commandes**: http://localhost:8002/api
- **Gateway API**: http://localhost:8003/api

### Compte Admin par Défaut

```
Email: admin@canteen.com
Mot de passe: password
```

## Structure du Projet

```
API_XML_JSON/
├── service-menu-java/          # Service 1 - Menu Management
│   ├── src/
│   ├── pom.xml
│   ├── Dockerfile
│   └── README.md
├── service-orders-python/      # Service 2 - Orders & Queue
│   ├── app/
│   ├── requirements.txt
│   ├── Dockerfile
│   └── README.md
├── service-gateway-laravel/    # Service 3 - Auth & Gateway
│   ├── app/
│   ├── composer.json
│   ├── Dockerfile
│   └── README.md
├── service-frontend-react/     # Service 4 - Frontend
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
├── docker-compose.yml
└── README.md
```

## Fonctionnalités Principales

### Pour les Utilisateurs
- Consultation du menu avec filtres avancés
- Informations nutritionnelles détaillées
- Gestion des allergies personnelles
- Commande en ligne avec panier
- Suivi de commande en temps réel
- Position dans la file d'attente
- Historique des commandes
- Recommandations personnalisées
- Gestion du budget mensuel

### Pour les Administrateurs
- Gestion complète des plats
- Gestion des catégories
- Tableau de bord avec statistiques
- Gestion des utilisateurs
- Analytics détaillées
- Export de données XML/JSON

### Fonctionnalités Techniques
- Support complet XML et JSON
- Validation par schémas (XSD, JSON Schema)
- Transformations XSLT
- Conversion XML ↔ JSON
- Négociation de contenu automatique
- API RESTful complètes
- Architecture microservices

## Endpoints API

### Service Menu (14 endpoints)
```
GET    /api/meals                    - Liste tous les plats
GET    /api/meals/{id}              - Détail d'un plat
POST   /api/meals                   - Créer un plat
PUT    /api/meals/{id}              - Modifier un plat
DELETE /api/meals/{id}              - Supprimer un plat
GET    /api/categories              - Liste des catégories
GET    /api/meals/category/{id}    - Plats par catégorie
GET    /api/menu/today             - Menu du jour
GET    /api/meals/export/xml       - Export XML
GET    /api/meals/export/json      - Export JSON
POST   /api/validate/xml           - Validation XSD
POST   /api/transform/menu-to-html - XSLT vers HTML
POST   /api/transform/meal-to-pdf  - XSLT vers PDF
GET    /api/health                 - Health check
```

### Service Commandes (14 endpoints)
```
POST   /api/orders                      - Créer une commande
GET    /api/orders/{id}                - Détail commande
GET    /api/orders/user/{user_id}      - Historique utilisateur
GET    /api/orders                      - Toutes les commandes
GET    /api/queue/{user_id}            - Position dans la file
GET    /api/queue/status               - État de la file
POST   /api/convert/xml-to-json        - Conversion XML vers JSON
POST   /api/convert/json-to-xml        - Conversion JSON vers XML
POST   /api/validate/order-xml         - Validation XSD
POST   /api/validate/order-json        - Validation JSON Schema
POST   /api/transform/order-to-invoice - XSLT Facture
POST   /api/transform/orders-to-stats  - XSLT Statistiques
GET    /api/recommendations/{user_id}  - Recommandations
GET    /api/health                     - Health check
```

### Service Gateway (11 endpoints)
```
POST   /api/auth/register          - Inscription
POST   /api/auth/login            - Connexion
POST   /api/auth/logout           - Déconnexion
GET    /api/auth/me               - Info utilisateur
GET    /api/profile               - Voir profil
PUT    /api/profile               - Modifier profil
POST   /api/profile/allergies     - Gérer allergies
POST   /api/profile/preferences   - Gérer préférences
ANY    /api/gateway/meals/*       - Proxy vers Menu
ANY    /api/gateway/orders/*      - Proxy vers Orders
GET    /api/health                - Health check
```

## Base de Données

Le système utilise 3 bases de données MySQL séparées:

### canteen_menu
- categories (id, name, description)
- meals (id, name, description, price, category_id, image_url)
- nutritional_info (calories, protein, carbs, fat, fiber, sodium)
- allergens (meal_id, allergen_name)

### canteen_orders
- orders (id, user_id, total, status, pickup_time)
- order_items (order_id, meal_id, quantity, price)
- queue (order_id, position, estimated_time)

### canteen_auth
- users (id, name, email, password, role)
- user_profiles (user_id, budget, spent_this_month)
- user_allergies (user_id, allergen)
- user_preferences (user_id, preference)

## Support XML/JSON

Tous les endpoints supportent les deux formats via négociation de contenu:

### Requêtes
```bash
# JSON (par défaut)
curl -H "Accept: application/json" http://localhost:8001/api/meals

# XML
curl -H "Accept: application/xml" http://localhost:8001/api/meals
```

### Réponses
Le format de réponse s'adapte automatiquement selon l'en-tête `Accept`.

## Schémas et Validation

### XSD (XML Schema Definition)
- meal.xsd - Structure des plats
- menu.xsd - Structure des menus
- order.xsd - Structure des commandes

### JSON Schema
- order.schema.json - Validation des commandes JSON

### XSLT (Transformations)
- menu-to-html.xslt - Menu vers HTML
- meal-to-pdf.xslt - Plat vers PDF
- order-to-invoice.xslt - Commande vers Facture
- orders-to-stats.xslt - Commandes vers Statistiques

## Développement

### Service Menu (Java)
```bash
cd service-menu-java
mvn clean package
java -jar target/service-menu.war
```

### Service Commandes (Python)
```bash
cd service-orders-python
pip install -r requirements.txt
python run.py
```

### Service Gateway (Laravel)
```bash
cd service-gateway-laravel
composer install
php artisan serve
```

### Frontend (React)
```bash
cd service-frontend-react
npm install
npm run dev
```

## Tests

Chaque service dispose de son propre système de tests:

```bash
# Java
mvn test

# Python
pytest

# Laravel
php artisan test

# React
npm test
```

## Arrêt des Services

```bash
# Arrêter tous les services
docker-compose down

# Arrêter et supprimer les volumes (données)
docker-compose down -v
```

## Documentation

Chaque service possède son propre README détaillé:
- [Service Menu](./service-menu-java/README.md)
- [Service Commandes](./service-orders-python/README.md)
- [Service Gateway](./service-gateway-laravel/README.md)
- [Frontend React](./service-frontend-react/README.md)

## Normes de Code

- **Commentaires**: Tous en français
- **Variables**: CamelCase pour Java, snake_case pour Python/PHP
- **Pas d'emojis**: Code professionnel uniquement
- **Documentation**: Française et complète
- **Messages d'erreur**: En français

## Licence

Projet éducatif - DUT 2ème année

## Auteurs

Projet de système de cantine intelligente

## Support

Pour toute question ou problème, consulter la documentation de chaque service ou créer une issue.
