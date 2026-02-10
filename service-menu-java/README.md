# Service Menu - Gestion des Plats et Menus

## Description

Service Java EE de gestion des plats et menus pour la cantine intelligente. Fournit une API REST complète avec support XML/JSON, validation XSD, et transformations XSLT.

## Technologies

- **Java 11**
- **Servlets 4.0**
- **JDBC** avec PreparedStatement
- **Maven** pour la gestion des dependances
- **MySQL 8.0** pour la base de donnees
- **JAXB** pour le support XML
- **Gson** pour le support JSON
- **Saxon** pour les transformations XSLT
- **Tomcat 9** comme serveur d'applications

## Structure du Projet

```
service-menu-java/
├── src/
│   ├── main/
│   │   ├── java/com/canteen/menu/
│   │   │   ├── models/          # Modeles de donnees avec annotations JAXB
│   │   │   │   ├── Meal.java
│   │   │   │   ├── Category.java
│   │   │   │   ├── NutritionalInfo.java
│   │   │   │   └── Allergen.java
│   │   │   ├── servlets/        # Servlets REST
│   │   │   │   ├── MealServlet.java
│   │   │   │   ├── CategoryServlet.java
│   │   │   │   ├── MenuServlet.java
│   │   │   │   ├── XmlExportServlet.java
│   │   │   │   ├── XmlValidationServlet.java
│   │   │   │   ├── XsltTransformServlet.java
│   │   │   │   └── HealthCheckServlet.java
│   │   │   ├── dao/             # Data Access Objects
│   │   │   │   ├── MealDAO.java
│   │   │   │   └── CategoryDAO.java
│   │   │   ├── services/        # Services metier
│   │   │   │   ├── XmlService.java
│   │   │   │   ├── JsonService.java
│   │   │   │   └── XsltService.java
│   │   │   └── utils/           # Utilitaires
│   │   │       ├── DatabaseConnection.java
│   │   │       ├── ContentNegotiation.java
│   │   │       ├── CorsFilter.java
│   │   │       └── EncodingFilter.java
│   │   ├── resources/
│   │   │   ├── xsd/             # Schemas XML
│   │   │   │   ├── meal.xsd
│   │   │   │   └── menu.xsd
│   │   │   └── xslt/            # Feuilles de transformation
│   │   │       ├── menu-to-html.xslt
│   │   │       └── meal-to-pdf.xslt
│   │   └── webapp/
│   │       ├── WEB-INF/
│   │       │   └── web.xml
│   │       └── index.jsp
├── pom.xml
├── Dockerfile
├── init.sql
└── README.md
```

## Endpoints API (14 endpoints)

### Gestion des Plats

| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/meals` | Liste tous les plats |
| GET | `/api/meals/{id}` | Detail d'un plat specifique |
| POST | `/api/meals` | Creer un nouveau plat |
| PUT | `/api/meals/{id}` | Modifier un plat |
| DELETE | `/api/meals/{id}` | Supprimer un plat |

### Categories et Menu

| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/categories` | Liste toutes les categories |
| GET | `/api/meals/category/{id}` | Plats d'une categorie |
| GET | `/api/menu/today` | Menu du jour (plats disponibles) |

### Export

| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/meals/export/xml` | Exporter tous les plats en XML |
| GET | `/api/meals/export/json` | Exporter tous les plats en JSON |

### Validation

| Methode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/validate/xml` | Valider un XML contre le schema XSD |

### Transformations XSLT

| Methode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/transform/menu-to-html` | Transformer menu XML en HTML |
| POST | `/api/transform/meal-to-pdf` | Transformer plat XML en format PDF |

### Monitoring

| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/health` | Verifier l'etat du service |

## Support XML/JSON

Tous les endpoints supportent les deux formats via la negociation de contenu :

### Requetes

```bash
# Demander JSON (par defaut)
curl -H "Accept: application/json" http://localhost:8001/api/meals

# Demander XML
curl -H "Accept: application/xml" http://localhost:8001/api/meals
```

### Exemples de Requetes

#### Creer un plat (JSON)

```bash
curl -X POST http://localhost:8001/api/meals \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Steak frites",
    "description": "Steak de boeuf avec frites maison",
    "price": 12.50,
    "categoryId": 2,
    "available": true,
    "nutritionalInfo": {
      "calories": 650,
      "protein": 45.0,
      "carbs": 48.0,
      "fat": 32.0,
      "fiber": 4.5,
      "sodium": 580.0
    },
    "allergens": [
      {"allergenName": "Gluten"}
    ]
  }'
```

#### Creer un plat (XML)

```bash
curl -X POST http://localhost:8001/api/meals \
  -H "Content-Type: application/xml" \
  -d '<meal xmlns="http://canteen.com/meal">
    <name>Steak frites</name>
    <description>Steak de boeuf avec frites maison</description>
    <price>12.50</price>
    <categoryId>2</categoryId>
    <available>true</available>
    <nutritionalInfo>
      <calories>650</calories>
      <protein>45.0</protein>
      <carbs>48.0</carbs>
      <fat>32.0</fat>
      <fiber>4.5</fiber>
      <sodium>580.0</sodium>
    </nutritionalInfo>
    <allergens>
      <allergen>
        <allergenName>Gluten</allergenName>
      </allergen>
    </allergens>
  </meal>'
```

#### Valider un XML

```bash
curl -X POST http://localhost:8001/api/validate/xml \
  -H "Content-Type: application/xml" \
  -d '<meal xmlns="http://canteen.com/meal">
    <name>Test</name>
    <description>Description test</description>
    <price>5.00</price>
    <categoryId>1</categoryId>
    <available>true</available>
  </meal>'
```

#### Transformer en HTML

```bash
curl -X POST http://localhost:8001/api/transform/menu-to-html \
  -H "Content-Type: application/xml" \
  --data @menu.xml
```

## Configuration

### Variables d'Environnement

| Variable | Valeur par Defaut | Description |
|----------|-------------------|-------------|
| DB_HOST | localhost | Hote de la base de donnees |
| DB_PORT | 3306 | Port de la base de donnees |
| DB_NAME | canteen_menu | Nom de la base de donnees |
| DB_USER | root | Utilisateur de la base |
| DB_PASSWORD | root123 | Mot de passe de la base |

## Installation et Execution

### Avec Maven (Developpement)

```bash
# Installer les dependances
mvn clean install

# Compiler le projet
mvn compile

# Packager en WAR
mvn package

# Deployer sur Tomcat
cp target/service-menu.war $TOMCAT_HOME/webapps/
```

### Avec Docker

```bash
# Construire l'image
docker build -t service-menu .

# Lancer le conteneur
docker run -p 8001:8080 \
  -e DB_HOST=mysql-menu \
  -e DB_NAME=canteen_menu \
  -e DB_USER=root \
  -e DB_PASSWORD=root123 \
  service-menu
```

### Avec Docker Compose

```bash
# Depuis la racine du projet
docker-compose up -d service-menu mysql-menu
```

## Base de Donnees

### Schema

Le service utilise 4 tables :

- **categories** : Categories de plats (Entree, Plat, Dessert, Boisson)
- **meals** : Plats avec prix et disponibilite
- **nutritional_info** : Informations nutritionnelles par plat
- **allergens** : Allergenes par plat

### Initialisation

Le fichier `init.sql` contient :
- La creation du schema
- Les categories par defaut
- Des donnees d'exemple pour les tests

```bash
# Executer le script d'initialisation
mysql -u root -p < init.sql
```

## Schemas et Transformations

### Schemas XSD

#### meal.xsd
Schema pour la validation des plats avec informations nutritionnelles et allergenes.

#### menu.xsd
Schema pour la validation des menus complets avec categories.

### Transformations XSLT

#### menu-to-html.xslt
Transforme un menu XML en page HTML formatee avec CSS.

#### meal-to-pdf.xslt
Transforme un plat XML en format XSL-FO pour generation PDF.

## Tests

### Tester le service

```bash
# Verifier la sante du service
curl http://localhost:8001/api/health

# Lister tous les plats
curl http://localhost:8001/api/meals

# Obtenir les categories
curl http://localhost:8001/api/categories

# Menu du jour
curl http://localhost:8001/api/menu/today
```

## Architecture

### Pattern DAO

Le service utilise le pattern DAO (Data Access Object) pour separer la logique d'acces aux donnees de la logique metier.

### Singleton

La connexion a la base de donnees utilise le pattern Singleton pour optimiser les ressources.

### Servlets REST

Chaque servlet gere un aspect specifique de l'API REST avec support des operations CRUD.

### Services

Les services (XML, JSON, XSLT) encapsulent la logique de transformation et serialisation.

## Securite

- Utilisation de PreparedStatement pour prevenir les injections SQL
- Validation des entrees
- Gestion des exceptions
- Encodage UTF-8 force
- Support CORS pour le developpement

## Logs

Le service utilise SLF4J pour les logs :

```java
private static final Logger logger = LoggerFactory.getLogger(MealServlet.class);
```

Niveaux de log :
- ERROR : Erreurs critiques
- WARN : Avertissements
- INFO : Informations importantes
- DEBUG : Details de debogage

## Performance

- Connexion pooling pour la base de donnees
- Validation en cache des schemas XSD
- Serialisation optimisee JSON/XML
- Gestion efficace des ressources avec try-with-resources

## Dependances Maven

Principales dependances :
- javax.servlet-api 4.0.1
- mysql-connector-java 8.0.33
- jaxb-api 2.3.1
- gson 2.10.1
- Saxon-HE 11.5

Voir `pom.xml` pour la liste complete.

## Troubleshooting

### Erreur de connexion a la base

Verifier que MySQL est demarre et accessible :

```bash
mysql -h localhost -u root -p
```

### Port deja utilise

Changer le port de Tomcat ou arreter l'application utilisant le port 8080.

### Erreur de compilation

```bash
mvn clean install -U
```

## Contribution

1. Toujours ecrire les commentaires en francais
2. Pas d'emojis dans le code
3. Suivre les conventions Java
4. Ajouter des tests pour les nouvelles fonctionnalites
5. Documenter les changements

## Licence

Projet educatif - DUT 2eme annee

## Support

Pour toute question, consulter la documentation ou creer une issue sur le depot.
