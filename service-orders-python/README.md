# Service Orders - Python Flask

Service de gestion des commandes developpe en Python avec Flask pour le systeme de cantine intelligente.

## Caracteristiques

- API REST complete pour la gestion des commandes
- Support XML et JSON avec negociation de contenu
- Validation des donnees (XSD pour XML, JSON Schema pour JSON)
- Transformations XSLT (facture, statistiques)
- Systeme de file d'attente
- Moteur de recommandations
- Conversions XML/JSON bidirectionnelles

## Technologies

- **Framework**: Flask 3.0
- **Base de donnees**: MySQL via PyMySQL
- **XML**: lxml, xmlschema, dicttoxml, xmltodict
- **JSON**: jsonschema
- **HTTP Client**: requests

## Structure du projet

```
service-orders-python/
├── app/
│   ├── __init__.py           # Initialisation Flask
│   ├── config.py              # Configuration
│   ├── database.py            # Gestion BD
│   ├── models/                # Modeles de donnees
│   │   ├── order.py
│   │   ├── order_item.py
│   │   └── queue.py
│   ├── services/              # Logique metier
│   │   ├── order_service.py
│   │   ├── queue_service.py
│   │   ├── recommendation_service.py
│   │   ├── xml_service.py
│   │   ├── json_service.py
│   │   └── xslt_service.py
│   ├── routes/                # Endpoints API
│   │   ├── orders.py
│   │   ├── queue.py
│   │   ├── converter.py
│   │   ├── validator.py
│   │   └── recommendations.py
│   └── clients/               # Clients HTTP
│       └── menu_client.py
├── schemas/                   # Schemas XSD et JSON
│   ├── xsd/
│   │   └── order.xsd
│   ├── xslt/
│   │   ├── order-to-invoice.xslt
│   │   └── orders-to-stats.xslt
│   └── order.schema.json
├── run.py                     # Point d'entree
├── requirements.txt           # Dependances Python
├── Dockerfile
└── README.md
```

## Installation

### Prerequis

- Python 3.11+
- MySQL 8.0+
- pip

### Configuration

1. Cloner le repository
2. Copier `.env.example` vers `.env` et configurer les variables
3. Installer les dependances:

```bash
pip install -r requirements.txt
```

4. Creer la base de donnees:

```sql
CREATE DATABASE canteen_db;

USE canteen_db;

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    pickup_time DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status)
);

CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    meal_id INT NOT NULL,
    meal_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id),
    INDEX idx_meal_id (meal_id)
);

CREATE TABLE queue (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(50) DEFAULT 'waiting',
    position INT,
    estimated_time INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status)
);
```

## Utilisation

### Demarrage en mode developpement

```bash
python run.py
```

Le service sera disponible sur `http://localhost:5001`

### Demarrage avec Docker

```bash
docker build -t orders-service .
docker run -p 5001:5001 --env-file .env orders-service
```

## API Endpoints

### Commandes

#### POST /api/orders
Cree une nouvelle commande

**Headers**:
- `Content-Type`: application/json ou application/xml
- `Accept`: application/json ou application/xml

**Body JSON**:
```json
{
  "userId": 1,
  "items": [
    {
      "mealId": 1,
      "mealName": "Poulet roti",
      "quantity": 2,
      "price": 12.50
    }
  ],
  "total": 25.00,
  "pickupTime": "2024-02-10T12:30:00Z"
}
```

**Response**: 201 Created

#### GET /api/orders
Recupere toutes les commandes

**Query params**:
- `limit`: Nombre de resultats (defaut: 100)
- `offset`: Decalage pour pagination (defaut: 0)

#### GET /api/orders/{id}
Recupere une commande par ID

#### GET /api/orders/user/{user_id}
Recupere toutes les commandes d'un utilisateur

#### PUT /api/orders/{id}
Met a jour le statut d'une commande

**Body**:
```json
{
  "status": "preparing"
}
```

Statuts valides: pending, preparing, ready, completed, cancelled

#### DELETE /api/orders/{id}
Supprime une commande

### File d'attente

#### GET /api/queue/user/{user_id}
Recupere la position dans la queue pour un utilisateur

#### GET /api/queue/status
Recupere le statut global de la file d'attente

### Conversions

#### POST /api/convert/xml-to-json
Convertit du XML en JSON

**Headers**: `Content-Type: application/xml`

#### POST /api/convert/json-to-xml
Convertit du JSON en XML

**Headers**: `Content-Type: application/json`

### Validation

#### POST /api/validate/order-xml
Valide du XML contre le schema XSD

#### POST /api/validate/order-json
Valide du JSON contre le JSON Schema

#### GET /api/validate/json-schema
Recupere le JSON Schema des commandes

### Recommandations

#### GET /api/recommendations/{user_id}
Recupere les recommandations pour un utilisateur

## Negociation de contenu

Le service supporte XML et JSON. Le format de reponse est determine par l'en-tete `Accept`:

- `Accept: application/json` → reponse JSON
- `Accept: application/xml` → reponse XML

## Transformations XSLT

### Facture HTML

Transforme une commande XML en facture HTML:

```python
from app.services.xslt_service import XSLTService

html = XSLTService.order_to_invoice(order_xml)
```

### Statistiques HTML

Transforme une liste de commandes XML en page de statistiques:

```python
html = XSLTService.orders_to_stats(orders_xml)
```

## Schemas

### XSD (order.xsd)
Schema XML pour la validation des commandes

### JSON Schema (order.schema.json)
Schema JSON pour la validation des commandes

## Tests

### Test de sante
```bash
curl http://localhost:5001/health
```

### Creation d'une commande JSON
```bash
curl -X POST http://localhost:5001/api/orders \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "userId": 1,
    "items": [
      {
        "mealId": 1,
        "mealName": "Poulet roti",
        "quantity": 1,
        "price": 12.50
      }
    ],
    "total": 12.50
  }'
```

### Creation d'une commande XML
```bash
curl -X POST http://localhost:5001/api/orders \
  -H "Content-Type: application/xml" \
  -H "Accept: application/xml" \
  -d '<?xml version="1.0" encoding="UTF-8"?>
  <order xmlns="http://canteen.com/order">
    <userId>1</userId>
    <items>
      <item>
        <mealId>1</mealId>
        <mealName>Poulet roti</mealName>
        <quantity>1</quantity>
        <price>12.50</price>
      </item>
    </items>
    <total>12.50</total>
    <status>pending</status>
  </order>'
```

### Validation XML
```bash
curl -X POST http://localhost:5001/api/validate/order-xml \
  -H "Content-Type: application/xml" \
  -d @order.xml
```

## Variables d'environnement

- `FLASK_ENV`: Environnement (development/production)
- `PORT`: Port d'ecoute (defaut: 5001)
- `SECRET_KEY`: Cle secrete Flask
- `DB_HOST`: Hote MySQL
- `DB_PORT`: Port MySQL
- `DB_NAME`: Nom de la base de donnees
- `DB_USER`: Utilisateur MySQL
- `DB_PASSWORD`: Mot de passe MySQL
- `MENU_SERVICE_URL`: URL du service Menu

## Architecture

Le service suit une architecture en couches:

1. **Routes**: Gestion des requetes HTTP et negociation de contenu
2. **Services**: Logique metier et operations
3. **Models**: Representation des donnees
4. **Database**: Acces aux donnees
5. **Clients**: Communication avec services externes

## Gestion des erreurs

Toutes les erreurs sont retournees en JSON avec:
- Code HTTP approprie
- Message d'erreur en francais
- Details si disponibles

Exemple:
```json
{
  "error": "Commande non trouvee"
}
```

## Securite

- Validation des entrees (XSD, JSON Schema)
- Prevention des injections SQL (requetes parametrees)
- CORS configure pour les origines autorisees
- Pas de secrets dans le code

## Performance

- Connexions BD gerees avec context managers
- Indexes sur les colonnes frequemment requetees
- Pagination pour les listes
- Cache possible au niveau route (a implementer)

## Auteur

Systeme de Cantine Intelligente - Service Orders Python

## Licence

Projet academique
