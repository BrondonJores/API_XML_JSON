# Service Orders & Queue - Python Flask

Service de gestion des commandes et de la file d'attente pour le systeme de restaurant.

## Structure du projet

```
service-orders-python/
├── app/
│   ├── __init__.py          # Initialisation Flask avec CORS
│   ├── config.py            # Configuration depuis variables d'environnement
│   ├── database.py          # Connexion base de donnees PyMySQL
│   └── routes/
│       ├── orders.py        # Routes pour les commandes
│       ├── queue.py         # Routes pour la file d'attente
│       └── health.py        # Routes de verification de sante
├── requirements.txt         # Dependances Python
├── run.py                   # Point d'entree de l'application
└── .env.example            # Exemple de configuration
```

## Installation

1. Creer un environnement virtuel:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows
```

2. Installer les dependances:
```bash
pip install -r requirements.txt
```

3. Configurer les variables d'environnement:
```bash
cp .env.example .env
# Editer .env avec vos parametres
```

## Configuration

Variables d'environnement dans `.env`:

- `DB_HOST`: Hote de la base de donnees (defaut: localhost)
- `DB_PORT`: Port MySQL (defaut: 3306)
- `DB_NAME`: Nom de la base de donnees (defaut: restaurant_db)
- `DB_USER`: Utilisateur MySQL (defaut: root)
- `DB_PASSWORD`: Mot de passe MySQL
- `MENU_SERVICE_URL`: URL du service menu (defaut: http://localhost:8080)
- `SECRET_KEY`: Cle secrete Flask

## Lancement

```bash
python run.py
```

Le service demarre sur le port **5000**.

## Endpoints

- `GET /health` - Verification de sante
- `GET /` - Information sur le service
- `GET /api/orders` - Liste des commandes
- `POST /api/orders` - Creer une commande
- `GET /api/orders/{id}` - Details d'une commande
- `PUT /api/orders/{id}` - Mettre a jour une commande
- `DELETE /api/orders/{id}` - Supprimer une commande
- `GET /api/queue` - File d'attente
- `POST /api/queue` - Ajouter a la file
- `DELETE /api/queue/{id}` - Retirer de la file

## Technologies

- Flask 2.3.0 - Framework web
- PyMySQL 1.1.0 - Connexion MySQL
- lxml 4.9.3 - Traitement XML
- xmlschema 2.4.0 - Validation schema XML
- jsonschema 4.19.0 - Validation schema JSON
- dicttoxml 1.7.16 - Conversion dict vers XML
- xmltodict 0.13.0 - Conversion XML vers dict
- python-dotenv 1.0.0 - Variables d'environnement
- requests 2.31.0 - Requetes HTTP
