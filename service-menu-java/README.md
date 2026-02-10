# Service Menu Java

Service de gestion des menus de la cantine en Java EE avec Maven.

## Caracteristiques

- Java 11
- Servlets 4.0
- Maven
- Support XML et JSON via content negotiation
- Validation XML avec XSD
- Transformation XSLT
- Base de donnees MySQL
- Tomcat 9

## Structure du projet

```
service-menu-java/
├── pom.xml
├── Dockerfile
└── src/
    └── main/
        ├── java/com/canteen/menu/
        │   ├── models/          # Modeles de donnees
        │   ├── dao/             # Data Access Objects
        │   ├── servlets/        # Servlets REST
        │   ├── services/        # Services (XML, JSON, XSLT)
        │   ├── utils/           # Utilitaires
        │   └── filters/         # Filtres (CORS)
        ├── webapp/
        │   ├── WEB-INF/
        │   │   ├── web.xml      # Configuration servlets
        │   │   ├── schemas/     # Schemas XSD
        │   │   └── xslt/        # Feuilles de transformation
        │   └── index.html       # Page d'accueil
        └── resources/
```

## Configuration

### Variables d'environnement

- `DB_HOST`: Hote de la base de donnees (defaut: mysql-menu)
- `DB_PORT`: Port de la base de donnees (defaut: 3306)
- `DB_NAME`: Nom de la base de donnees (defaut: canteen_menu)
- `DB_USER`: Utilisateur de la base de donnees (defaut: root)
- `DB_PASSWORD`: Mot de passe de la base de donnees (defaut: root)

## Compilation

```bash
mvn clean package
```

## Execution locale

```bash
mvn clean package
cp target/service-menu.war $CATALINA_HOME/webapps/
$CATALINA_HOME/bin/catalina.sh run
```

## Docker

```bash
# Construction de l'image
docker build -t service-menu-java .

# Execution du conteneur
docker run -d -p 8080:8080 \
  -e DB_HOST=mysql-menu \
  -e DB_NAME=canteen_menu \
  -e DB_USER=root \
  -e DB_PASSWORD=root \
  service-menu-java
```

## Endpoints API

### Plats (Meals)
- `GET /api/meals` - Liste tous les plats
- `GET /api/meals/{id}` - Recupere un plat
- `POST /api/meals` - Cree un plat
- `PUT /api/meals/{id}` - Met a jour un plat
- `DELETE /api/meals/{id}` - Supprime un plat

### Menu
- `GET /api/menu` - Menu complet
- `GET /api/menu/available` - Plats disponibles
- `GET /api/menu/category/{id}` - Plats par categorie

### Categories
- `GET /api/categories` - Liste toutes les categories
- `GET /api/categories/{id}` - Recupere une categorie
- `POST /api/categories` - Cree une categorie
- `PUT /api/categories/{id}` - Met a jour une categorie
- `DELETE /api/categories/{id}` - Supprime une categorie

### Export et transformation
- `GET /api/export/xml` - Exporte le menu en XML
- `POST /api/validate/xml` - Valide un XML contre le schema
- `POST /api/transform/xslt` - Transforme XML en HTML

## Content Negotiation

Le service supporte XML et JSON. Utilisez le header `Accept`:
- `Accept: application/xml` pour XML
- `Accept: application/json` pour JSON

## Securite

- Utilisation de PreparedStatement pour prevenir les injections SQL
- Filtre CORS pour les requetes cross-origin
- Validation des entrees
