# Smart Canteen System - Système Complet de Gestion de Cantine

Système intelligent de gestion de cantine avec architecture microservices, support complet XML/JSON, validations XSD/JSON Schema, et transformations XSLT.

## Architecture du Système

Le système est composé de 4 microservices indépendants communiquant via REST API:

### Services

1. **Service Menu** (Java EE + Maven) - Port 8001
   - Gestion des plats et catégories
   - Support XML/JSON avec validation XSD
   - Transformations XSLT (menu vers HTML, plat vers PDF)
   - 14 endpoints REST

2. **Service Orders** (Python Flask) - Port 8002
   - Gestion des commandes
   - Système de file d'attente
   - Recommandations personnalisées
   - Conversion XML ↔ JSON
   - 14 endpoints REST

3. **Service Gateway** (Laravel/PHP) - Port 8003
   - Authentification et autorisation
   - Gestion des profils utilisateurs
   - Proxy vers les autres services
   - 11 endpoints REST

4. **Service Frontend** (React + Tailwind CSS) - Port 3000
   - Interface utilisateur moderne
   - 21 pages complètes
   - Plus de 40 composants réutilisables
   - Design responsive

### Bases de Données

3 bases MySQL distinctes:
- **canteen_menu** (port 3306) - Données du menu
- **canteen_orders** (port 3307) - Données des commandes
- **canteen_auth** (port 3308) - Données d'authentification

## Technologies Utilisées

### Service Menu (Java)
- Java 11
- Servlets 4.0
- JDBC avec PreparedStatement
- Maven
- JAXB pour XML
- Gson pour JSON
- Saxon pour XSLT
- Tomcat 9

### Service Orders (Python)
- Python 3.9
- Flask
- PyMySQL
- lxml pour XML
- xmlschema pour validation XSD
- jsonschema pour validation JSON
- dicttoxml et xmltodict pour conversions

### Service Gateway (PHP)
- PHP 8.1
- Laravel 10
- Laravel Sanctum pour authentification
- Eloquent ORM
- Guzzle HTTP Client

### Service Frontend (JavaScript)
- React 18
- React Router DOM 6
- Tailwind CSS 3
- Axios pour API
- React Hook Form
- Chart.js pour graphiques
- Vite comme bundler

## Installation

### Prérequis
- Docker
- Docker Compose

### Démarrage rapide

1. Cloner le dépôt:
```bash
git clone https://github.com/BrondonJores/API_XML_JSON.git
cd API_XML_JSON
```

2. Lancer tous les services avec Docker Compose:
```bash
docker-compose up -d
```

3. Attendre que tous les services démarrent (environ 2-3 minutes)

4. Accéder aux services:
   - Frontend: http://localhost:3000
   - Service Menu: http://localhost:8001
   - Service Orders: http://localhost:8002
   - Service Gateway: http://localhost:8003

## Utilisation

### Identifiants par défaut

**Administrateur:**
- Email: admin@canteen.com
- Mot de passe: password

### Endpoints API

#### Service Menu (8001)

**Plats:**
- `GET /api/meals` - Liste tous les plats
- `GET /api/meals/{id}` - Détail d'un plat
- `POST /api/meals` - Créer un plat
- `PUT /api/meals/{id}` - Modifier un plat
- `DELETE /api/meals/{id}` - Supprimer un plat

**Catégories:**
- `GET /api/categories` - Liste des catégories
- `GET /api/meals/category/{id}` - Plats par catégorie

**Menu:**
- `GET /api/menu/today` - Menu du jour

**Export/Conversion:**
- `GET /api/meals/export/xml` - Export en XML
- `GET /api/meals/export/json` - Export en JSON
- `POST /api/validate/xml` - Valider XML contre XSD
- `POST /api/transform/menu-to-html` - XSLT Menu vers HTML
- `POST /api/transform/meal-to-pdf` - XSLT Plat vers PDF

**Monitoring:**
- `GET /api/health` - Health check

#### Service Orders (8002)

**Commandes:**
- `POST /api/orders` - Créer une commande
- `GET /api/orders/{id}` - Détail d'une commande
- `GET /api/orders/user/{user_id}` - Historique utilisateur
- `GET /api/orders` - Toutes les commandes (admin)

**File d'attente:**
- `GET /api/queue/{user_id}` - Position dans la file
- `GET /api/queue/status` - État complet de la file

**Conversion:**
- `POST /api/convert/xml-to-json` - Conversion XML vers JSON
- `POST /api/convert/json-to-xml` - Conversion JSON vers XML

**Validation:**
- `POST /api/validate/order-xml` - Validation XSD
- `POST /api/validate/order-json` - Validation JSON Schema

**Transformations:**
- `POST /api/transform/order-to-invoice` - XSLT Commande vers Facture
- `POST /api/transform/orders-to-stats` - XSLT Stats

**Recommandations:**
- `GET /api/recommendations/{user_id}` - Recommandations personnalisées

**Monitoring:**
- `GET /api/health` - Health check

#### Service Gateway (8003)

**Authentification:**
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/me` - Informations utilisateur

**Profil:**
- `GET /api/profile` - Voir profil
- `PUT /api/profile` - Modifier profil
- `POST /api/profile/allergies` - Gérer allergies
- `POST /api/profile/preferences` - Gérer préférences

**Proxy:**
- `ANY /api/gateway/meals/*` - Proxy vers Service Menu
- `ANY /api/gateway/orders/*` - Proxy vers Service Orders

**Monitoring:**
- `GET /api/health` - Health check

## Structure du Projet

```
API_XML_JSON/
├── service-menu-java/          # Service Java pour les menus
├── service-orders-python/      # Service Python pour les commandes
├── service-gateway-laravel/    # Service Laravel pour l'authentification
├── service-frontend-react/     # Application React
├── schemas/                    # Schémas XSD, JSON Schema et XSLT
├── docker-compose.yml          # Configuration Docker Compose
└── README.md                   # Ce fichier
```

## Fonctionnalités Principales

### Support XML/JSON
- Tous les endpoints acceptent et retournent XML ou JSON
- Content negotiation automatique
- Validation complète avec XSD et JSON Schema

### Transformations XSLT
- Menu vers HTML
- Commande vers facture
- Statistiques agrégées

### Conversion
- XML vers JSON bidirectionnel
- Interface web interactive pour conversion

### Sécurité
- Authentification JWT via Laravel Sanctum
- Hashage bcrypt des mots de passe
- Protection CORS
- PreparedStatement contre SQL injection

### Interface Utilisateur

**21 Pages complètes:**

Pages publiques:
1. Accueil avec présentation
2. Menu avec filtres avancés
3. Détail de plat
4. À propos
5. Contact

Pages authentification:
6. Connexion
7. Inscription multi-étapes
8. Mot de passe oublié
9. Réinitialisation

Pages utilisateur:
10. Commande (panier)
11. Mes commandes
12. Détail commande
13. Profil
14. Édition profil
15. File d'attente
16. Favoris

Pages administrateur:
17. Dashboard avec KPIs
18. Gestion des plats
19. Gestion utilisateurs
20. Analytics

Page spéciale:
21. Convertisseur XML/JSON

## Développement

### Arrêter les services
```bash
docker-compose down
```

### Voir les logs
```bash
docker-compose logs -f [service-name]
```

### Reconstruire les services
```bash
docker-compose up -d --build
```

## Support

Pour toute question ou problème, veuillez créer une issue sur GitHub.

## Licence

Projet éducatif - DUT 2ème année / Licence 3

---

**Développé avec professionnalisme pour l'apprentissage des architectures microservices et du traitement XML/JSON**
