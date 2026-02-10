# Documentation API - Service Gateway

## Configuration

### Variables d'environnement
```
DB_HOST=mysql-auth
DB_PORT=3306
DB_DATABASE=auth_db
DB_USERNAME=auth_user
DB_PASSWORD=auth_password

MENU_SERVICE_URL=http://service-menu:8080
ORDERS_SERVICE_URL=http://service-orders:8000
```

## Endpoints

### 1. POST /api/auth/register
Inscription d'un nouveau utilisateur.

**Corps de la requête:**
```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "password": "motdepasse123",
  "password_confirmation": "motdepasse123"
}
```

**Réponse (201):**
```json
{
  "message": "Inscription réussie",
  "user": {...},
  "token": "1|abcdef..."
}
```

### 2. POST /api/auth/login
Connexion d'un utilisateur.

**Corps de la requête:**
```json
{
  "email": "jean@example.com",
  "password": "motdepasse123"
}
```

**Réponse (200):**
```json
{
  "message": "Connexion réussie",
  "user": {...},
  "token": "2|ghijkl..."
}
```

### 3. POST /api/auth/logout
Déconnexion de l'utilisateur courant.

**En-tête:** `Authorization: Bearer {token}`

**Réponse (200):**
```json
{
  "message": "Déconnexion réussie"
}
```

### 4. GET /api/auth/me
Récupération des informations de l'utilisateur connecté.

**En-tête:** `Authorization: Bearer {token}`

**Réponse (200):**
```json
{
  "user": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "profile": {...},
    "allergies": [...],
    "preferences": [...]
  }
}
```

### 5. GET /api/profile
Affichage du profil utilisateur.

**En-tête:** `Authorization: Bearer {token}`

**Réponse (200):**
```json
{
  "user": {
    "id": 1,
    "name": "Jean Dupont",
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

### 6. PUT /api/profile
Mise à jour du profil utilisateur.

**En-tête:** `Authorization: Bearer {token}`

**Corps de la requête:**
```json
{
  "name": "Jean Dupont",
  "phone": "+33612345678",
  "address": "123 Rue de Paris",
  "city": "Paris",
  "postal_code": "75001",
  "country": "France",
  "dietary_restrictions": ["vegetarien"]
}
```

**Réponse (200):**
```json
{
  "message": "Profil mis à jour avec succès",
  "user": {...}
}
```

### 7. POST /api/profile/allergies
Gestion des allergies utilisateur.

**En-tête:** `Authorization: Bearer {token}`

**Corps de la requête:**
```json
{
  "allergies": [
    {
      "allergen": "arachides",
      "severity": "high"
    },
    {
      "allergen": "lactose",
      "severity": "medium"
    }
  ]
}
```

**Réponse (200):**
```json
{
  "message": "Allergies mises à jour avec succès",
  "allergies": [...]
}
```

### 8. POST /api/profile/preferences
Gestion des préférences utilisateur.

**En-tête:** `Authorization: Bearer {token}`

**Corps de la requête:**
```json
{
  "preferences": {
    "cuisine_favorite": "italienne",
    "niveau_epicé": "moyen",
    "notification_email": "true"
  }
}
```

**Réponse (200):**
```json
{
  "message": "Préférences mises à jour avec succès",
  "preferences": [...]
}
```

### 9. ANY /api/gateway/meals/*
Proxy vers le service Menu (Java).

**En-tête:** `Authorization: Bearer {token}`

Toutes les requêtes sont transmises au service Menu avec l'en-tête d'authentification.

### 10. ANY /api/gateway/orders/*
Proxy vers le service Orders (Python).

**En-tête:** `Authorization: Bearer {token}`

Toutes les requêtes sont transmises au service Orders avec l'ID utilisateur dans l'en-tête `X-User-Id`.

### 11. GET /api/health
Vérification de santé du service.

**Réponse (200):**
```json
{
  "status": "ok",
  "service": "gateway",
  "timestamp": "2024-01-15T10:30:00.000000Z"
}
```

## Administration

### GET /api/admin/dashboard
Tableau de bord administrateur (nécessite is_admin=true).

**En-tête:** `Authorization: Bearer {token}`

**Réponse (200):**
```json
{
  "message": "Tableau de bord administrateur",
  "timestamp": "2024-01-15T10:30:00.000000Z"
}
```

## Compte administrateur par défaut

Créé par le seeder `AdminSeeder`:
- **Email:** admin@example.com
- **Mot de passe:** admin123

## Codes d'erreur

- **400:** Mauvaise requête
- **401:** Non authentifié
- **403:** Non autorisé (accès administrateur requis)
- **404:** Ressource non trouvée
- **422:** Erreur de validation
- **500:** Erreur serveur
- **502:** Erreur de passerelle (service externe indisponible)
