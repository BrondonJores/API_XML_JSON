# Documentation API - Service Orders & Queue Management

## Endpoints disponibles

### 1. Health Check
```bash
GET /api/health
```

**Réponse:**
```json
{
  "status": "healthy",
  "service": "orders-service",
  "version": "1.0.0"
}
```

### 2. Créer une commande
```bash
POST /api/orders
Content-Type: application/json

{
  "user_id": 1,
  "items": [
    {"menu_item_id": 1, "quantity": 2},
    {"menu_item_id": 3, "quantity": 1}
  ]
}
```

**Réponse (201):**
```json
{
  "id": 1,
  "user_id": 1,
  "status": "pending",
  "total_price": 35.50,
  "items": [...],
  "created_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-15T10:30:00"
}
```

### 3. Récupérer une commande
```bash
GET /api/orders/{order_id}
```

### 4. Historique des commandes d'un utilisateur
```bash
GET /api/orders/user/{user_id}
```

### 5. Toutes les commandes (admin)
```bash
GET /api/orders?status=pending&limit=10
```

### 6. Position dans la file d'attente
```bash
GET /api/queue/{user_id}
```

**Réponse:**
```json
{
  "id": 1,
  "user_id": 1,
  "order_id": 1,
  "position": 3,
  "status": "waiting",
  "joined_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-15T10:30:00"
}
```

### 7. État de la file d'attente
```bash
GET /api/queue/status
```

**Réponse:**
```json
{
  "total_waiting": 5,
  "queue": [...]
}
```

### 8. Conversion XML vers JSON
```bash
POST /api/convert/xml-to-json
Content-Type: application/xml

<?xml version="1.0"?>
<order>
  <user_id>1</user_id>
  <items>
    <item>
      <menu_item_id>1</menu_item_id>
      <quantity>2</quantity>
      <price>10.50</price>
    </item>
  </items>
</order>
```

### 9. Conversion JSON vers XML
```bash
POST /api/convert/json-to-xml
Content-Type: application/json

{
  "user_id": 1,
  "items": [...]
}
```

### 10. Validation XML avec XSD
```bash
POST /api/validate/order-xml
Content-Type: application/xml

<?xml version="1.0"?>
<order>...</order>
```

**Réponse:**
```json
{
  "valid": true,
  "message": "XML valide selon le schéma XSD"
}
```

### 11. Validation JSON avec JSON Schema
```bash
POST /api/validate/order-json
Content-Type: application/json

{
  "user_id": 1,
  "items": [...]
}
```

### 12. Transformation XSLT - Commande vers Facture
```bash
POST /api/transform/order-to-invoice
Content-Type: application/xml

<?xml version="1.0"?>
<order>
  <id>1</id>
  <user_id>1</user_id>
  <total_price>35.50</total_price>
  <status>completed</status>
  <items>...</items>
</order>
```

**Réponse:** XML de facture

### 13. Transformation XSLT - Statistiques
```bash
POST /api/transform/orders-to-stats
Content-Type: application/xml

<?xml version="1.0"?>
<orders>
  <order>...</order>
  <order>...</order>
</orders>
```

**Réponse:** XML de statistiques

### 14. Recommandations personnalisées
```bash
GET /api/recommendations/{user_id}
```

**Réponse:**
```json
[
  {
    "menu_item_id": 1,
    "name": "Pizza Margherita",
    "price": 12.50,
    "category": "Pizza",
    "order_count": 5,
    "total_quantity": 8,
    "recommendation_reason": "Basé sur vos commandes précédentes"
  }
]
```

## Codes de statut HTTP

- `200 OK` - Requête réussie
- `201 Created` - Ressource créée
- `400 Bad Request` - Données invalides
- `404 Not Found` - Ressource non trouvée
- `500 Internal Server Error` - Erreur serveur

## Exemples avec curl

### Créer une commande
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "items": [
      {"menu_item_id": 1, "quantity": 2}
    ]
  }'
```

### Convertir XML en JSON
```bash
curl -X POST http://localhost:5000/api/convert/xml-to-json \
  -H "Content-Type: application/xml" \
  -d '<?xml version="1.0"?><order><user_id>1</user_id></order>'
```

### Vérifier la santé du service
```bash
curl http://localhost:5000/api/health
```
