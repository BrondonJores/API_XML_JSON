# Service Menu Java

Service de gestion des menus de cantine developpe en Java avec Jakarta EE, offrant une API REST avec support complet XML et JSON.

## Technologies utilisees

- **Java 17**
- **Jakarta EE 10** (Servlet API, JAXB)
- **Apache Tomcat 10.1**
- **Maven 3.9**
- **PostgreSQL**
- **JAXB** pour la serialisation XML
- **Gson** pour la serialisation JSON
- **Saxon-HE** pour les transformations XSLT

## Fonctionnalites

- API REST complete pour la gestion des plats et categories
- Support dual XML/JSON base sur le header Accept
- Validation XML contre schemas XSD
- Transformations XSLT (menu vers HTML, commande vers facture)
- Export des donnees en XML et JSON
- Filtres CORS pour integration frontend
- Health check endpoint
- Gestion complete des informations nutritionnelles et allergenes

## Architecture

```
service-menu-java/
├── src/
│   ├── main/
│   │   ├── java/com/canteen/menu/
│   │   │   ├── dao/              # Acces aux donnees
│   │   │   ├── filters/          # Filtres HTTP (CORS, Encoding)
│   │   │   ├── models/           # Modeles de donnees avec annotations JAXB
│   │   │   ├── services/         # Services metier (XML, JSON, XSLT)
│   │   │   ├── servlets/         # Contrôleurs REST
│   │   │   └── utils/            # Utilitaires
│   │   ├── resources/
│   │   │   ├── xsd/              # Schemas XSD
│   │   │   └── xslt/             # Feuilles de transformation XSLT
│   │   └── webapp/
│   │       ├── WEB-INF/
│   │       │   └── web.xml       # Configuration servlets
│   │       └── index.jsp         # Page d'accueil
│   └── test/
├── pom.xml
├── Dockerfile
└── README.md
```

## Endpoints API

### Gestion des plats

- `GET /api/meals` - Recuperer tous les plats
- `GET /api/meals/{id}` - Recuperer un plat specifique
- `POST /api/meals` - Creer un nouveau plat
- `PUT /api/meals/{id}` - Mettre a jour un plat
- `DELETE /api/meals/{id}` - Supprimer un plat

### Gestion des categories

- `GET /api/categories` - Recuperer toutes les categories
- `GET /api/categories/{id}` - Recuperer une categorie specifique
- `GET /api/meals/category/{id}` - Recuperer les plats d'une categorie

### Menu

- `GET /api/menu/today` - Recuperer le menu du jour

### Export

- `GET /api/meals/export/xml` - Exporter tous les plats en XML
- `GET /api/meals/export/json` - Exporter tous les plats en JSON

### Validation et transformation

- `POST /api/validate/xml?schema={type}` - Valider un XML contre un schema XSD
  - Parametres: `schema=meal|menu|order`
- `POST /api/transform/menu-to-html` - Transformer un menu en HTML
- `POST /api/transform/meal-to-pdf` - Transformer une commande en facture

### Health check

- `GET /api/health` - Verifier l'etat du service et de la base de donnees

## Negociation de contenu

Le service supporte la negociation de contenu via le header HTTP `Accept`:

### Requetes GET

```bash
# Reponse en JSON (par defaut)
curl -H "Accept: application/json" http://localhost:8080/api/meals

# Reponse en XML
curl -H "Accept: application/xml" http://localhost:8080/api/meals
```

### Requetes POST/PUT

```bash
# Envoyer du JSON
curl -X POST http://localhost:8080/api/meals \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"name": "Salade Caesar", "price": 8.50, "categoryId": 1}'

# Envoyer du XML
curl -X POST http://localhost:8080/api/meals \
  -H "Content-Type: application/xml" \
  -H "Accept: application/xml" \
  -d '<meal><name>Salade Caesar</name><price>8.50</price><categoryId>1</categoryId></meal>'
```

## Installation et deploiement

### Prerequis

- Java 17 ou superieur
- Maven 3.9 ou superieur
- PostgreSQL 15 ou superieur
- Docker (optionnel)

### Configuration de la base de donnees

1. Creer la base de donnees PostgreSQL:

```sql
CREATE DATABASE canteen_db;
```

2. Configurer les variables d'environnement:

```bash
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=canteen_db
export DB_USER=postgres
export DB_PASSWORD=your_password
```

### Compilation et execution locale

```bash
# Compiler le projet
mvn clean package

# Deployer sur Tomcat local
cp target/service-menu-java.war $TOMCAT_HOME/webapps/

# Ou executer avec Maven
mvn tomcat7:run
```

### Execution avec Docker

```bash
# Construire l'image
docker build -t service-menu-java .

# Executer le conteneur
docker run -d \
  -p 8080:8080 \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=5432 \
  -e DB_NAME=canteen_db \
  -e DB_USER=postgres \
  -e DB_PASSWORD=postgres \
  --name menu-service \
  service-menu-java
```

### Execution avec Docker Compose

```yaml
version: '3.8'

services:
  menu-service:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=canteen_db
      - DB_USER=postgres
      - DB_PASSWORD=postgres
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=canteen_db
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Tests

### Tester le service

```bash
# Health check
curl http://localhost:8080/api/health

# Recuperer tous les plats en JSON
curl -H "Accept: application/json" http://localhost:8080/api/meals

# Recuperer tous les plats en XML
curl -H "Accept: application/xml" http://localhost:8080/api/meals

# Creer un plat
curl -X POST http://localhost:8080/api/meals \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Poulet roti",
    "description": "Poulet fermier roti aux herbes",
    "price": 12.50,
    "categoryId": 2,
    "available": true,
    "nutritionalInfo": {
      "calories": 450,
      "protein": 35.5,
      "carbs": 12.0,
      "fat": 28.0,
      "fiber": 2.5,
      "sodium": 1.2
    },
    "allergens": ["gluten"]
  }'

# Valider un XML
curl -X POST "http://localhost:8080/api/validate/xml?schema=meal" \
  -H "Content-Type: application/xml" \
  -d '<meal><name>Test</name><price>10.00</price></meal>'

# Transformer un menu en HTML
curl -X POST http://localhost:8080/api/transform/menu-to-html \
  -H "Content-Type: application/xml" \
  -d '<menu>...</menu>'
```

## Structure de la base de donnees

### Tables principales

- `meals` - Plats
- `categories` - Categories de plats
- `nutritional_info` - Informations nutritionnelles
- `allergens` - Allergenes des plats

## Gestion des erreurs

Le service retourne des codes HTTP standards:

- `200 OK` - Requete reussie
- `201 Created` - Ressource creee
- `204 No Content` - Suppression reussie
- `400 Bad Request` - Donnees invalides
- `404 Not Found` - Ressource non trouvee
- `500 Internal Server Error` - Erreur serveur

Format des erreurs:

```json
{
  "erreur": "Message d'erreur descriptif"
}
```

## Securite

- Utilisation de PreparedStatement pour prevenir les injections SQL
- Filtres CORS configurables
- Encodage UTF-8 force sur toutes les requetes/reponses
- Validation XSD des donnees XML
- Headers de securite HTTP

## Performance

- Connection pooling avec HikariCP (via configuration Tomcat)
- Transactions optimisees pour les operations multiples
- Mise en cache des schemas XSD et feuilles XSLT
- Compilation des transformations XSLT pour meilleure performance

## Logs

Les logs sont disponibles dans les fichiers Tomcat:

```bash
tail -f $TOMCAT_HOME/logs/catalina.out
```

## Maintenance

### Sauvegarder la base de donnees

```bash
pg_dump -U postgres canteen_db > backup.sql
```

### Restaurer la base de donnees

```bash
psql -U postgres canteen_db < backup.sql
```

## Contribution

1. Fork le projet
2. Creer une branche feature (`git checkout -b feature/amelioration`)
3. Commit les changements (`git commit -am 'Ajout nouvelle fonctionnalite'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Creer une Pull Request

## Licence

Projet developpe dans le cadre du systeme de gestion de cantine.

## Support

Pour toute question ou probleme, consulter la documentation ou contacter l'equipe de developpement.
