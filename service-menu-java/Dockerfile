# Etape 1: Construction de l'application avec Maven
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copier les fichiers de configuration Maven
COPY pom.xml .

# Telecharger les dependances
RUN mvn dependency:go-offline -B

# Copier le code source
COPY src ./src

# Construire l'application
RUN mvn clean package -DskipTests

# Etape 2: Image de production avec Tomcat 10
FROM tomcat:10.1-jdk17

# Supprimer les applications par defaut de Tomcat
RUN rm -rf /usr/local/tomcat/webapps/*

# Copier le WAR depuis l'etape de build
COPY --from=builder /app/target/*.war /usr/local/tomcat/webapps/ROOT.war

# Configurer les variables d'environnement pour la base de donnees
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_NAME=canteen_db
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres

# Exposer le port 8080
EXPOSE 8080

# Demarrer Tomcat
CMD ["catalina.sh", "run"]
