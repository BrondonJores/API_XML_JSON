# Service Orders & Queue Management - Récapitulatif

## Structure du projet

```
service-orders-python/
├── app/
│   ├── __init__.py              # Initialisation Flask et enregistrement des blueprints
│   ├── config.py                # Configuration (variables d'environnement)
│   ├── database.py              # Gestion connexions MySQL et initialisation tables
│   ├── models/                  # Modèles de données
│   │   ├── order.py            # Modèle Order
│   │   ├── order_item.py       # Modèle OrderItem
│   │   └── queue.py            # Modèle Queue
│   ├── routes/                  # Routes/Endpoints REST
│   │   ├── orders.py           # 4 endpoints commandes
│   │   ├── queue.py            # 2 endpoints file d'attente
│   │   ├── converter.py        # 2 endpoints conversions XML/JSON
│   │   ├── validator.py        # 2 endpoints validations
│   │   └── recommendations.py  # 3 endpoints (recommandations + XSLT)
│   ├── services/                # Logique métier
│   │   ├── order_service.py    # Gestion des commandes
│   │   ├── queue_service.py    # Gestion file d'attente
│   │   ├── recommendation_service.py  # Recommandations
│   │   ├── xml_service.py      # Conversions et validations XML
│   │   ├── json_service.py     # Conversions et validations JSON
│   │   └── xslt_service.py     # Transformations XSLT
│   ├── clients/                 # Clients HTTP
│   │   └── menu_client.py      # Appel service Menu
│   └── utils/                   # Utilitaires
│       └── helpers.py          # Fonctions utilitaires
├── xslt/                        # Fichiers XSLT (générés automatiquement)
│   ├── order_to_invoice.xslt   # Transformation commande → facture
│   └── orders_to_stats.xslt    # Transformation commandes → statistiques
├── schemas/                     # Schémas XSD (générés automatiquement)
│   └── order.xsd               # Schéma XSD pour validation commandes
├── run.py                       # Point d'entrée application
├── requirements.txt             # Dépendances Python
├── requirements-dev.txt         # Dépendances développement
├── Dockerfile                   # Image Docker Python 3.9
├── docker-compose.yml           # Configuration Docker avec MySQL
├── manage.sh                    # Script de gestion du service
├── test_api.py                  # Script de test des endpoints
├── pytest.ini                   # Configuration pytest
├── .env.example                 # Exemple de configuration
├── .gitignore                   # Fichiers à ignorer
├── README.md                    # Documentation principale
├── API_DOCUMENTATION.md         # Documentation API détaillée
└── PROJECT_SUMMARY.md           # Ce fichier

```

## Statistiques

- **Lignes de code Python**: ~1416 lignes
- **Fichiers Python**: 27 fichiers
- **Endpoints REST**: 14 endpoints
- **Services**: 6 services métier
- **Modèles**: 3 modèles de données
- **Tables MySQL**: 3 tables (orders, order_items, queue)

## Technologies utilisées

- **Python**: 3.9
- **Framework**: Flask 2.3.3
- **Base de données**: MySQL 8.0 via PyMySQL
- **XML**: lxml, xmlschema, xmltodict
- **JSON**: jsonschema, dicttoxml
- **HTTP Client**: requests
- **CORS**: Flask-CORS

## Fonctionnalités implémentées

### 1. Gestion des commandes (4 endpoints)
- Création de commandes avec validation
- Récupération d'une commande
- Historique utilisateur
- Liste complète (admin)

### 2. File d'attente (2 endpoints)
- Position utilisateur
- Statut global de la file
- Réorganisation automatique

### 3. Conversions (2 endpoints)
- XML → JSON (xmltodict)
- JSON → XML (dicttoxml)

### 4. Validations (2 endpoints)
- Validation XML avec XSD (xmlschema)
- Validation JSON avec JSON Schema (jsonschema)

### 5. Transformations XSLT (2 endpoints)
- Commande → Facture
- Commandes → Statistiques

### 6. Recommandations (1 endpoint)
- Basées sur l'historique utilisateur
- Articles populaires en fallback

### 7. Santé (1 endpoint)
- Health check pour monitoring

## Base de données

### Table `orders`
- id, user_id, status, total_price
- created_at, updated_at
- Index sur user_id, status, created_at

### Table `order_items`
- id, order_id, menu_item_id, quantity, price
- Clé étrangère sur orders
- Index sur order_id

### Table `queue`
- id, user_id, order_id, position, status
- joined_at, updated_at
- Contrainte UNIQUE sur user_id
- Clé étrangère sur orders
- Index sur user_id, position, status

## Intégration avec service Menu

Le service Orders appelle le service Menu (Java) via HTTP pour:
- Récupérer les prix des articles
- Vérifier la disponibilité
- Enrichir les recommandations

Client robuste avec fallback en cas d'erreur.

## Fichiers générés automatiquement

### Schéma XSD (schemas/order.xsd)
Schéma de validation XML pour les commandes créé automatiquement au premier appel.

### Fichiers XSLT (xslt/)
- order_to_invoice.xslt: Transforme commande en facture
- orders_to_stats.xslt: Génère statistiques

Créés automatiquement au démarrage du service.

## Déploiement

### Avec Docker Compose
```bash
./manage.sh start    # Démarre service + MySQL
./manage.sh logs     # Affiche les logs
./manage.sh stop     # Arrête tout
```

### Sans Docker
```bash
# Installer les dépendances
pip install -r requirements.txt

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos paramètres

# Lancer le service
python run.py
```

## Tests

```bash
# Tests manuels avec le script
python test_api.py

# Tests avec pytest (si installé)
pytest

# Tests via curl
curl http://localhost:5000/api/health
```

## Commentaires et documentation

Tous les commentaires et messages sont en **français** comme requis.
Aucun emoji n'est utilisé dans le code.

## Conformité aux exigences

✓ Python 3.9
✓ Flask framework
✓ requirements.txt complet
✓ Structure app/ avec tous les modules
✓ 14 endpoints REST fonctionnels
✓ MySQL avec variables d'environnement
✓ Client HTTP vers service Menu
✓ Dockerfile Python 3.9
✓ Commentaires en français
✓ Pas d'emojis
