# Liste complète des 14 endpoints REST

## Service Orders & Queue Management (Python Flask)
Port: 5000

### 1. Health Check
```
GET /api/health
```
Vérifie l'état de santé du service.

### 2. Créer une commande
```
POST /api/orders
```
Crée une nouvelle commande avec validation des articles via le service Menu.

### 3. Récupérer une commande
```
GET /api/orders/{id}
```
Récupère les détails d'une commande spécifique avec ses articles.

### 4. Historique utilisateur
```
GET /api/orders/user/{user_id}
```
Récupère toutes les commandes d'un utilisateur.

### 5. Toutes les commandes (admin)
```
GET /api/orders?status=pending&limit=10
```
Récupère toutes les commandes avec filtres optionnels.

### 6. Position dans la file
```
GET /api/queue/{user_id}
```
Récupère la position d'un utilisateur dans la file d'attente.

### 7. Statut de la file
```
GET /api/queue/status
```
Récupère l'état global de la file d'attente.

### 8. Conversion XML → JSON
```
POST /api/convert/xml-to-json
Content-Type: application/xml
```
Convertit un document XML en JSON.

### 9. Conversion JSON → XML
```
POST /api/convert/json-to-xml
Content-Type: application/json
```
Convertit un document JSON en XML.

### 10. Validation XML (XSD)
```
POST /api/validate/order-xml
Content-Type: application/xml
```
Valide un XML de commande contre le schéma XSD.

### 11. Validation JSON (Schema)
```
POST /api/validate/order-json
Content-Type: application/json
```
Valide un JSON de commande contre le JSON Schema.

### 12. Transformation XSLT - Commande → Facture
```
POST /api/transform/order-to-invoice
Content-Type: application/xml
```
Transforme une commande XML en facture XML via XSLT.

### 13. Transformation XSLT - Statistiques
```
POST /api/transform/orders-to-stats
Content-Type: application/xml
```
Transforme plusieurs commandes XML en statistiques XML via XSLT.

### 14. Recommandations
```
GET /api/recommendations/{user_id}
```
Récupère des recommandations personnalisées basées sur l'historique.

---

## Résumé par catégorie

**Commandes (4)**: 
- POST /api/orders
- GET /api/orders/{id}
- GET /api/orders/user/{user_id}
- GET /api/orders

**File d'attente (2)**:
- GET /api/queue/{user_id}
- GET /api/queue/status

**Conversions (2)**:
- POST /api/convert/xml-to-json
- POST /api/convert/json-to-xml

**Validations (2)**:
- POST /api/validate/order-xml
- POST /api/validate/order-json

**Transformations XSLT (2)**:
- POST /api/transform/order-to-invoice
- POST /api/transform/orders-to-stats

**Recommandations (1)**:
- GET /api/recommendations/{user_id}

**Santé (1)**:
- GET /api/health

**Total: 14 endpoints**
