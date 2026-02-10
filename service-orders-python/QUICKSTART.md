# QUICKSTART - Service Orders Python

## Installation Rapide

### 1. Installer les dependances

```bash
pip install -r requirements.txt
```

### 2. Configurer l'environnement

```bash
cp .env.example .env
# Editer .env avec vos parametres
```

### 3. Creer la base de donnees

```bash
mysql -u root -p < database.sql
```

### 4. Verifier l'installation

```bash
python check_installation.py
```

### 5. Demarrer le service

```bash
python run.py
```

Le service sera disponible sur http://localhost:5001

## Test rapide

```bash
# Health check
curl http://localhost:5001/health

# Creer une commande
curl -X POST http://localhost:5001/api/orders \
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

# Recuperer toutes les commandes
curl http://localhost:5001/api/orders
```

## Docker

```bash
# Build
docker build -t orders-service .

# Run
docker run -p 5001:5001 --env-file .env orders-service
```

## Documentation

- **README.md** - Documentation complete
- **API_EXAMPLES.md** - Exemples d'utilisation
- **DEPLOYMENT.md** - Guide de deploiement
- **PROJECT_SUMMARY.md** - Resume du projet

## Support

Pour plus d'informations, consultez README.md
