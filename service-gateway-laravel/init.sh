#!/bin/bash

# Script d'initialisation du Gateway Service Laravel

echo "=========================================="
echo "Initialisation du Gateway Service Laravel"
echo "=========================================="
echo ""

# Vérifier si le fichier .env existe
if [ ! -f .env ]; then
    echo "Création du fichier .env à partir de .env.example..."
    cp .env.example .env
    echo "✓ Fichier .env créé"
else
    echo "✓ Fichier .env existe déjà"
fi

echo ""
echo "Installation des dépendances Composer..."
composer install

echo ""
echo "Génération de la clé d'application..."
php artisan key:generate

echo ""
echo "Configuration de la base de données..."
echo "Attendez que MySQL soit prêt..."
sleep 10

echo ""
echo "Exécution des migrations..."
php artisan migrate --force

echo ""
echo "Peuplement de la base de données..."
php artisan db:seed --force

echo ""
echo "Optimisation de l'application..."
php artisan config:cache
php artisan route:cache

echo ""
echo "=========================================="
echo "✓ Initialisation terminée avec succès!"
echo "=========================================="
echo ""
echo "Comptes de test créés :"
echo "  Admin: admin@example.com / password"
echo "  User:  user@example.com / password"
echo ""
echo "Le service est maintenant prêt à être utilisé."
echo ""
