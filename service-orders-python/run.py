"""
Point d'entree principal pour lancer l'application Flask
"""

from app import create_app

# Creation de l'instance de l'application
app = create_app()

if __name__ == '__main__':
    # Lancement du serveur de developpement
    # Pour la production, utiliser un serveur WSGI comme Gunicorn
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
