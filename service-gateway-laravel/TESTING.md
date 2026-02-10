# Tests et exemples d'utilisation

Ce fichier contient des exemples de requêtes pour tester l'API du Gateway Service.

## Variables d'environnement

```bash
export API_URL="http://localhost:8000/api"
export TOKEN=""
```

## 1. Vérification de santé

```bash
curl -X GET "$API_URL/health"
```

## 2. Inscription

```bash
curl -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

## 3. Connexion

```bash
# Connexion avec le compte admin
curl -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password"
  }'

# Enregistrer le token
export TOKEN="COLLER_VOTRE_TOKEN_ICI"
```

## 4. Informations utilisateur

```bash
curl -X GET "$API_URL/auth/me" \
  -H "Authorization: Bearer $TOKEN"
```

## 5. Profil

### Obtenir le profil
```bash
curl -X GET "$API_URL/profile" \
  -H "Authorization: Bearer $TOKEN"
```

### Mettre à jour le profil
```bash
curl -X PUT "$API_URL/profile" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin Updated",
    "phone": "+33612345678",
    "address": "123 Rue de Paris",
    "city": "Paris",
    "postal_code": "75001",
    "country": "France"
  }'
```

## 6. Allergies

### Ajouter une allergie
```bash
curl -X POST "$API_URL/profile/allergies" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "allergy_name": "Gluten",
    "severity": "high"
  }'
```

### Supprimer une allergie
```bash
curl -X DELETE "$API_URL/profile/allergies/1" \
  -H "Authorization: Bearer $TOKEN"
```

## 7. Préférences

### Ajouter une préférence
```bash
curl -X POST "$API_URL/profile/preferences" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "preference_key": "cuisine",
    "preference_value": "italienne"
  }'
```

### Supprimer une préférence
```bash
curl -X DELETE "$API_URL/profile/preferences/1" \
  -H "Authorization: Bearer $TOKEN"
```

## 8. Proxy Menu Service

```bash
# Obtenir les éléments du menu
curl -X GET "$API_URL/menu/items" \
  -H "Authorization: Bearer $TOKEN"

# Créer un élément (admin uniquement)
curl -X POST "$API_URL/menu/items" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pizza Margherita",
    "description": "Pizza classique avec tomates et mozzarella",
    "price": 12.50,
    "category": "pizza"
  }'
```

## 9. Proxy Orders Service

```bash
# Obtenir les commandes
curl -X GET "$API_URL/orders" \
  -H "Authorization: Bearer $TOKEN"

# Créer une commande
curl -X POST "$API_URL/orders" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "item_id": 1,
        "quantity": 2
      }
    ],
    "delivery_address": "123 Rue de Paris, 75001 Paris"
  }'
```

## 10. Déconnexion

```bash
curl -X POST "$API_URL/auth/logout" \
  -H "Authorization: Bearer $TOKEN"
```

## Tests avec Python

```python
import requests

API_URL = "http://localhost:8000/api"

# Connexion
response = requests.post(f"{API_URL}/auth/login", json={
    "email": "admin@example.com",
    "password": "password"
})

token = response.json()["data"]["token"]
headers = {"Authorization": f"Bearer {token}"}

# Obtenir le profil
response = requests.get(f"{API_URL}/profile", headers=headers)
print(response.json())

# Ajouter une allergie
response = requests.post(f"{API_URL}/profile/allergies", 
    headers=headers,
    json={
        "allergy_name": "Lactose",
        "severity": "medium"
    }
)
print(response.json())
```

## Tests avec JavaScript

```javascript
const API_URL = "http://localhost:8000/api";

// Connexion
const login = async () => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'admin@example.com',
      password: 'password'
    })
  });
  
  const data = await response.json();
  return data.data.token;
};

// Obtenir le profil
const getProfile = async (token) => {
  const response = await fetch(`${API_URL}/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return await response.json();
};

// Utilisation
login().then(token => {
  console.log('Token:', token);
  return getProfile(token);
}).then(profile => {
  console.log('Profile:', profile);
});
```

## Collection Postman

Une collection Postman est disponible pour faciliter les tests :

1. Importer la collection dans Postman
2. Configurer la variable d'environnement `api_url` : `http://localhost:8000/api`
3. Exécuter la requête de connexion
4. Le token sera automatiquement enregistré dans les variables d'environnement
5. Toutes les autres requêtes utiliseront ce token automatiquement

## Tests automatisés

```bash
# Exécuter les tests PHPUnit
php artisan test

# Avec couverture
php artisan test --coverage
```
