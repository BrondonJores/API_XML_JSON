#!/bin/bash

# Script de gestion du service Orders

case "$1" in
  start)
    echo "Démarrage du service Orders..."
    docker-compose up -d
    echo "Attente du démarrage de MySQL..."
    sleep 10
    echo "Service démarré sur http://localhost:5000"
    ;;
  stop)
    echo "Arrêt du service Orders..."
    docker-compose down
    ;;
  restart)
    echo "Redémarrage du service Orders..."
    docker-compose restart
    ;;
  logs)
    docker-compose logs -f orders-service
    ;;
  test)
    echo "Exécution des tests..."
    python3 test_api.py
    ;;
  build)
    echo "Construction de l'image Docker..."
    docker-compose build
    ;;
  clean)
    echo "Nettoyage complet..."
    docker-compose down -v
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|logs|test|build|clean}"
    echo ""
    echo "Commandes:"
    echo "  start   - Démarre le service"
    echo "  stop    - Arrête le service"
    echo "  restart - Redémarre le service"
    echo "  logs    - Affiche les logs"
    echo "  test    - Lance les tests"
    echo "  build   - Reconstruit l'image Docker"
    echo "  clean   - Arrête et supprime tout (volumes compris)"
    exit 1
    ;;
esac

exit 0
