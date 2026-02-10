FROM maven:3.8.6-openjdk-11-slim AS build

# Repertoire de travail
WORKDIR /app

# Copier le fichier pom.xml
COPY pom.xml .

# Telecharger les dependances
RUN mvn dependency:go-offline -B

# Copier le code source
COPY src ./src

# Compiler et packager l'application
RUN mvn clean package -DskipTests

# Image finale avec Tomcat
FROM tomcat:9.0-jdk11-openjdk-slim

# Supprimer les applications par defaut de Tomcat
RUN rm -rf /usr/local/tomcat/webapps/*

# Copier le fichier WAR
COPY --from=build /app/target/service-menu.war /usr/local/tomcat/webapps/ROOT.war

# Exposer le port 8080
EXPOSE 8080

# Demarrer Tomcat
CMD ["catalina.sh", "run"]
