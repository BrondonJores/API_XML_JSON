# Image de base PHP 8.1 avec FPM
FROM php:8.1-fpm

# Définition du répertoire de travail
WORKDIR /var/www/html

# Installation des dépendances système
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Installation des extensions PHP requises
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copie des fichiers de dépendances
COPY composer.json composer.lock ./

# Installation des dépendances PHP
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Copie du code de l'application
COPY . .

# Finalisation de l'installation Composer
RUN composer dump-autoload --optimize

# Configuration des permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Exposition du port
EXPOSE 8000

# Script de démarrage
CMD php artisan config:cache && \
    php artisan route:cache && \
    php artisan migrate --force && \
    php artisan serve --host=0.0.0.0 --port=8000
