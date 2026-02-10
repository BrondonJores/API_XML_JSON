#!/bin/bash

set -e

echo "Démarrage du service Gateway..."

# Génération de la clé d'application si nécessaire
if [ ! -f /var/www/html/.env ]; then
    cp /var/www/html/.env.example /var/www/html/.env
    php artisan key:generate
fi

# Attente de la base de données
echo "Attente de la base de données..."
until php artisan migrate --force 2>/dev/null; do
    echo "Base de données non disponible, nouvelle tentative dans 3 secondes..."
    sleep 3
done

echo "Exécution des migrations..."
php artisan migrate --force

echo "Exécution des seeders..."
php artisan db:seed --force --class=AdminSeeder

# Optimisation du cache
php artisan config:cache
php artisan route:cache

echo "Démarrage de PHP-FPM et Nginx..."

# Démarrage de PHP-FPM en arrière-plan
php-fpm -D

# Démarrage de Nginx au premier plan
nginx -g 'daemon off;'
