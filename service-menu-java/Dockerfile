FROM tomcat:9-jdk11

# Informations sur le mainteneur
LABEL maintainer="Canteen Service"
LABEL description="Service de gestion des menus - Java EE"

# Suppression de l'application par defaut de Tomcat
RUN rm -rf /usr/local/tomcat/webapps/*

# Variables d'environnement pour la base de donnees
ENV DB_HOST=mysql-menu
ENV DB_PORT=3306
ENV DB_NAME=canteen_menu
ENV DB_USER=root
ENV DB_PASSWORD=root

# Configuration de Tomcat
ENV CATALINA_OPTS="-Xms512m -Xmx1024m"

# Copie du fichier WAR
COPY target/service-menu.war /usr/local/tomcat/webapps/ROOT.war

# Exposition du port
EXPOSE 8080

# Commande de demarrage
CMD ["catalina.sh", "run"]
