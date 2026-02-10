# API Gateway Service - Documentation

## Description

Le Gateway Service est le point d'entrée unique pour toutes les requêtes API de l'architecture microservices API_XML_JSON. Il gère l'authentification, l'autorisation et le routage vers les services appropriés.

## Base URL

```
http://localhost:8000/api
```

## Authentification

L'API utilise Laravel Sanctum pour l'authentification par token. Pour accéder aux endpoints protégés, incluez le token dans l'en-tête Authorization :

```
Authorization: Bearer {votre_token}
```

## Endpoints

### Authentification

#### Inscription
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "is_admin": false
}
```

**Réponse (201 Created):**
```json
{
  "message": "Utilisateur créé avec succès",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "is_admin": false,
      "profile": {
        "id": 1,
        "user_id": 1,
        "phone": null,
        "address": null
      }
    },
    "token": "1|abcdef123456..."
  }
}
```

#### Connexion
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Réponse (200 OK):**
```json
{
  "message": "Connexion réussie",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "is_admin": false,
      "profile": {},
      "allergies": [],
      "preferences": []
    },
    "token": "2|ghijkl789012..."
  }
}
```

#### Déconnexion
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

**Réponse (200 OK):**
```json
{
  "message": "Déconnexion réussie"
}
```

#### Informations utilisateur
```http
GET /api/auth/me
Authorization: Bearer {token}
```

**Réponse (200 OK):**
```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "is_admin": false,
    "profile": {},
    "allergies": [],
    "preferences": []
  }
}
```

### Profil Utilisateur

#### Obtenir le profil
```http
GET /api/profile
Authorization: Bearer {token}
```

#### Mettre à jour le profil
```http
PUT /api/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Doe Updated",
  "phone": "+33612345678",
  "address": "123 Rue de Paris",
  "city": "Paris",
  "postal_code": "75001",
  "country": "France",
  "date_of_birth": "1990-01-01"
}
```

**Réponse (200 OK):**
```json
{
  "message": "Profil mis à jour avec succès",
  "data": {
    "id": 1,
    "name": "John Doe Updated",
    "email": "john@example.com",
    "profile": {
      "phone": "+33612345678",
      "address": "123 Rue de Paris",
      "city": "Paris",
      "postal_code": "75001",
      "country": "France"
    }
  }
}
```

#### Ajouter une allergie
```http
POST /api/profile/allergies
Authorization: Bearer {token}
Content-Type: application/json

{
  "allergy_name": "Arachides",
  "severity": "high"
}
```

**Réponse (201 Created):**
```json
{
  "message": "Allergie ajoutée avec succès",
  "data": {
    "id": 1,
    "user_id": 1,
    "allergy_name": "Arachides",
    "severity": "high"
  }
}
```

#### Supprimer une allergie
```http
DELETE /api/profile/allergies/{id}
Authorization: Bearer {token}
```

**Réponse (200 OK):**
```json
{
  "message": "Allergie supprimée avec succès"
}
```

#### Ajouter une préférence
```http
POST /api/profile/preferences
Authorization: Bearer {token}
Content-Type: application/json

{
  "preference_key": "cuisine",
  "preference_value": "italienne"
}
```

**Réponse (201 Created):**
```json
{
  "message": "Préférence ajoutée avec succès",
  "data": {
    "id": 1,
    "user_id": 1,
    "preference_key": "cuisine",
    "preference_value": "italienne"
  }
}
```

#### Supprimer une préférence
```http
DELETE /api/profile/preferences/{id}
Authorization: Bearer {token}
```

**Réponse (200 OK):**
```json
{
  "message": "Préférence supprimée avec succès"
}
```

### Proxy Menu Service

Toutes les requêtes vers `/api/menu/*` sont automatiquement redirigées vers le service Menu (Java).

#### Exemples
```http
GET /api/menu/items
Authorization: Bearer {token}

POST /api/menu/items
Authorization: Bearer {token}
Content-Type: application/json
```

Les informations utilisateur sont automatiquement ajoutées dans les en-têtes :
- `X-User-Id`: ID de l'utilisateur
- `X-User-Email`: Email de l'utilisateur
- `X-User-Admin`: Statut admin (true/false)

### Proxy Orders Service

Toutes les requêtes vers `/api/orders/*` sont automatiquement redirigées vers le service Orders (Python).

#### Exemples
```http
GET /api/orders
Authorization: Bearer {token}

POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json
```

### Health Check

```http
GET /api/health
```

**Réponse (200 OK):**
```json
{
  "status": "ok",
  "service": "gateway",
  "timestamp": "2024-01-01T12:00:00+00:00"
}
```

## Codes d'erreur

- `200`: Succès
- `201`: Créé avec succès
- `400`: Requête invalide
- `401`: Non authentifié
- `403`: Accès refusé
- `404`: Ressource non trouvée
- `422`: Erreur de validation
- `500`: Erreur serveur

## Format des erreurs

```json
{
  "message": "Description de l'erreur",
  "errors": {
    "field": ["Message d'erreur spécifique au champ"]
  }
}
```

## Notes

- Tous les messages d'erreur sont en français
- Les tokens n'expirent pas par défaut (configurable)
- CORS est activé pour les origines configurées dans `.env`
- Toutes les requêtes API sont journalisées dans la table `api_logs`
