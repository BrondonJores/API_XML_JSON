#!/bin/bash

# Script de démarrage rapide du Gateway Service

echo "=========================================="
echo "Démarrage du Gateway Service avec Docker"
echo "=========================================="
echo ""

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker."
    exit 1
fi

# Vérifier si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose."
    exit 1
fi

echo "✓ Docker et Docker Compose sont installés"
echo ""

# Démarrer les conteneurs
echo "Démarrage des conteneurs..."
docker-compose -f docker-compose.local.yml up -d

echo ""
echo "Attente du démarrage de MySQL..."
sleep 15

echo ""
echo "Exécution des migrations dans le conteneur..."
docker exec gateway-service php artisan migrate --force

echo ""
echo "Peuplement de la base de données..."
docker exec gateway-service php artisan db:seed --force

echo ""
echo "=========================================="
echo "✓ Gateway Service démarré avec succès!"
echo "=========================================="
echo ""
echo "Services disponibles :"
echo "  - API Gateway: http://localhost:8000"
echo "  - phpMyAdmin:  http://localhost:8080"
echo ""
echo "Comptes de test :"
echo "  - Admin: admin@example.com / password"
echo "  - User:  user@example.com / password"
echo ""
echo "Pour voir les logs :"
echo "  docker-compose -f docker-compose.local.yml logs -f"
echo ""
echo "Pour arrêter les services :"
echo "  docker-compose -f docker-compose.local.yml down"
echo ""
