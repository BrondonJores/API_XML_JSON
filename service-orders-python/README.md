# Service Orders & Queue Management - Python Flask

Service Python Flask pour la gestion des commandes et des files d'attente.

## Fonctionnalités

- Gestion complète des commandes
- Système de file d'attente
- Conversion XML/JSON bidirectionnelle
- Validation XSD et JSON Schema
- Transformations XSLT (commande vers facture, statistiques)
- Recommandations basées sur l'historique

## Endpoints API

### Commandes
- `POST /api/orders` - Créer une commande
- `GET /api/orders/{id}` - Récupérer une commande
- `GET /api/orders/user/{user_id}` - Historique utilisateur
- `GET /api/orders` - Toutes les commandes

### File d'attente
- `GET /api/queue/{user_id}` - Position dans la file
- `GET /api/queue/status` - État de la file

### Conversions
- `POST /api/convert/xml-to-json` - XML vers JSON
- `POST /api/convert/json-to-xml` - JSON vers XML

### Validations
- `POST /api/validate/order-xml` - Valider XML contre XSD
- `POST /api/validate/order-json` - Valider JSON contre schéma

### Transformations
- `POST /api/transform/order-to-invoice` - Commande vers facture (XSLT)
- `POST /api/transform/orders-to-stats` - Statistiques (XSLT)

### Recommandations
- `GET /api/recommendations/{user_id}` - Recommandations personnalisées

### Santé
- `GET /api/health` - Vérification de santé

## Installation

```bash
pip install -r requirements.txt
```

## Configuration

Variables d'environnement:
- `DB_HOST` - Hôte MySQL (défaut: mysql-orders)
- `DB_PORT` - Port MySQL (défaut: 3306)
- `DB_NAME` - Nom de la base (défaut: orders_db)
- `DB_USER` - Utilisateur MySQL (défaut: root)
- `DB_PASSWORD` - Mot de passe MySQL
- `MENU_SERVICE_URL` - URL du service menu (défaut: http://localhost:8080)

## Lancement

```bash
python run.py
```

Le serveur démarre sur le port 5000.

## Docker

```bash
docker build -t orders-service .
docker run -p 5000:5000 orders-service
```
