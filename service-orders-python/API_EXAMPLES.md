# Exemples d'utilisation de l'API Orders

## Table des matieres

1. [Commandes](#commandes)
2. [File d'attente](#file-dattente)
3. [Conversions](#conversions)
4. [Validations](#validations)
5. [Recommandations](#recommandations)

## Commandes

### Creer une commande (JSON)

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
        "quantity": 2,
        "price": 12.50
      },
      {
        "mealId": 3,
        "mealName": "Tarte aux pommes",
        "quantity": 1,
        "price": 5.00
      }
    ],
    "total": 30.00,
    "pickupTime": "2024-02-10T12:30:00Z"
  }'
```

### Creer une commande (XML)

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
      <quantity>2</quantity>
      <price>12.50</price>
    </item>
  </items>
  <total>25.00</total>
  <status>pending</status>
  <pickupTime>2024-02-10T12:30:00Z</pickupTime>
</order>'
```

### Recuperer toutes les commandes

```bash
# Format JSON (defaut)
curl http://localhost:5001/api/orders

# Format XML
curl http://localhost:5001/api/orders \
  -H "Accept: application/xml"

# Avec pagination
curl "http://localhost:5001/api/orders?limit=10&offset=0"
```

### Recuperer une commande specifique

```bash
curl http://localhost:5001/api/orders/1
```

### Recuperer les commandes d'un utilisateur

```bash
curl http://localhost:5001/api/orders/user/1
```

### Mettre a jour le statut d'une commande

```bash
curl -X PUT http://localhost:5001/api/orders/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "preparing"
  }'
```

Statuts possibles:
- `pending`: En attente
- `preparing`: En preparation
- `ready`: Prete
- `completed`: Terminee
- `cancelled`: Annulee

### Supprimer une commande

```bash
curl -X DELETE http://localhost:5001/api/orders/1
```

## File d'attente

### Position d'un utilisateur dans la queue

```bash
curl http://localhost:5001/api/queue/user/1
```

Reponse:
```json
{
  "id": 1,
  "orderId": 1,
  "userId": 1,
  "status": "waiting",
  "position": 3,
  "estimatedTime": 15,
  "createdAt": "2024-02-10T10:30:00"
}
```

### Statut global de la queue

```bash
curl http://localhost:5001/api/queue/status
```

Reponse:
```json
{
  "total": 12,
  "waiting": 8,
  "preparing": 3,
  "ready": 1,
  "estimatedWaitTime": 55
}
```

## Conversions

### XML vers JSON

```bash
curl -X POST http://localhost:5001/api/convert/xml-to-json \
  -H "Content-Type: application/xml" \
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

### JSON vers XML

```bash
curl -X POST http://localhost:5001/api/convert/json-to-xml \
  -H "Content-Type: application/json" \
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
    "total": 12.50,
    "status": "pending"
  }'
```

## Validations

### Valider un XML de commande

```bash
curl -X POST http://localhost:5001/api/validate/order-xml \
  -H "Content-Type: application/xml" \
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

Reponse (valide):
```json
{
  "valid": true,
  "message": "XML valide"
}
```

Reponse (invalide):
```json
{
  "valid": false,
  "message": "XML invalide: Element 'userId': This element is not expected..."
}
```

### Valider un JSON de commande

```bash
curl -X POST http://localhost:5001/api/validate/order-json \
  -H "Content-Type: application/json" \
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

### Recuperer le JSON Schema

```bash
curl http://localhost:5001/api/validate/json-schema
```

## Recommandations

### Obtenir des recommandations pour un utilisateur

```bash
curl http://localhost:5001/api/recommendations/1
```

Reponse:
```json
{
  "userId": 1,
  "recommendations": [
    {
      "mealId": 1,
      "mealName": "Poulet roti",
      "reason": "Vous avez commande ce plat 5 fois",
      "score": 5
    },
    {
      "mealId": 3,
      "mealName": "Salade Cesar",
      "reason": "Recommande par des utilisateurs similaires",
      "score": 8
    }
  ]
}
```

## Health Check

### Verifier l'etat du service

```bash
curl http://localhost:5001/health
```

Reponse:
```json
{
  "status": "healthy",
  "service": "orders-python"
}
```

## Tests avec Python requests

### Exemple de script Python

```python
import requests
import json

BASE_URL = "http://localhost:5001"

# Creer une commande
order_data = {
    "userId": 1,
    "items": [
        {
            "mealId": 1,
            "mealName": "Poulet roti",
            "quantity": 2,
            "price": 12.50
        }
    ],
    "total": 25.00
}

response = requests.post(
    f"{BASE_URL}/api/orders",
    json=order_data,
    headers={"Accept": "application/json"}
)

if response.status_code == 201:
    order = response.json()
    print(f"Commande creee avec l'ID: {order['id']}")
    
    # Recuperer la position dans la queue
    queue_response = requests.get(
        f"{BASE_URL}/api/queue/user/{order['userId']}"
    )
    
    if queue_response.status_code == 200:
        queue_info = queue_response.json()
        print(f"Position dans la queue: {queue_info['position']}")
        print(f"Temps d'attente estime: {queue_info['estimatedTime']} minutes")
else:
    print(f"Erreur: {response.json()}")
```

## Tests avec JavaScript/Node.js

### Exemple avec axios

```javascript
const axios = require('axios');

const BASE_URL = 'http://localhost:5001';

async function createOrder() {
  try {
    const orderData = {
      userId: 1,
      items: [
        {
          mealId: 1,
          mealName: 'Poulet roti',
          quantity: 2,
          price: 12.50
        }
      ],
      total: 25.00
    };

    const response = await axios.post(
      `${BASE_URL}/api/orders`,
      orderData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    console.log('Commande creee:', response.data);

    // Recuperer les recommandations
    const recoResponse = await axios.get(
      `${BASE_URL}/api/recommendations/${response.data.userId}`
    );

    console.log('Recommandations:', recoResponse.data);

  } catch (error) {
    console.error('Erreur:', error.response?.data || error.message);
  }
}

createOrder();
```

## Workflow complet

### Scenario: Creer une commande et suivre son statut

```bash
# 1. Creer une commande
ORDER_ID=$(curl -s -X POST http://localhost:5001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "items": [{"mealId": 1, "mealName": "Poulet", "quantity": 1, "price": 12.50}],
    "total": 12.50
  }' | jq -r '.id')

echo "Commande creee avec ID: $ORDER_ID"

# 2. Verifier la position dans la queue
curl http://localhost:5001/api/queue/user/1 | jq

# 3. Mettre a jour le statut
curl -X PUT http://localhost:5001/api/orders/$ORDER_ID \
  -H "Content-Type: application/json" \
  -d '{"status": "preparing"}'

# 4. Marquer comme prete
curl -X PUT http://localhost:5001/api/orders/$ORDER_ID \
  -H "Content-Type: application/json" \
  -d '{"status": "ready"}'

# 5. Recuperer la commande complete
curl http://localhost:5001/api/orders/$ORDER_ID | jq
```

## Gestion des erreurs

### Erreurs courantes

1. **400 Bad Request**: Donnees invalides
```json
{
  "error": "Champ manquant: items"
}
```

2. **404 Not Found**: Ressource introuvable
```json
{
  "error": "Commande non trouvee"
}
```

3. **500 Internal Server Error**: Erreur serveur
```json
{
  "error": "Erreur lors de la creation: ..."
}
```

## Performance et optimisation

### Bonnes pratiques

1. **Pagination**: Toujours utiliser limit/offset pour les listes
2. **Accept header**: Specifier le format pour eviter les conversions inutiles
3. **Compression**: Utiliser gzip pour les grandes reponses
4. **Caching**: Implemente du caching cote client pour les recommandations

### Limites

- Taille maximale du payload: 10MB
- Timeout: 30 secondes
- Rate limiting: A implementer selon les besoins
