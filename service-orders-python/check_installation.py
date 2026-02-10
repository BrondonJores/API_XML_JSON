#!/usr/bin/env python3
"""
Script de verification de l'installation
"""
import sys

def check_imports():
    """Verifie que tous les modules necessaires sont importables"""
    errors = []
    
    modules_to_check = [
        'flask',
        'flask_cors',
        'pymysql',
        'lxml',
        'xmlschema',
        'jsonschema',
        'dicttoxml',
        'xmltodict',
        'requests',
        'dotenv'
    ]
    
    print("Verification des dependances...")
    for module in modules_to_check:
        try:
            __import__(module)
            print(f"✓ {module}")
        except ImportError as e:
            print(f"✗ {module}: {e}")
            errors.append(module)
    
    if errors:
        print(f"\n❌ Modules manquants: {', '.join(errors)}")
        print("Installez-les avec: pip install -r requirements.txt")
        return False
    
    print("\n✓ Toutes les dependances sont installees")
    return True

def check_app_structure():
    """Verifie la structure de l'application"""
    import os
    
    print("\nVerification de la structure...")
    
    required_paths = [
        'app/__init__.py',
        'app/config.py',
        'app/database.py',
        'app/models/order.py',
        'app/services/order_service.py',
        'app/routes/orders.py',
        'schemas/xsd/order.xsd',
        'schemas/xslt/order-to-invoice.xslt',
        'run.py'
    ]
    
    missing = []
    for path in required_paths:
        if os.path.exists(path):
            print(f"✓ {path}")
        else:
            print(f"✗ {path}")
            missing.append(path)
    
    if missing:
        print(f"\n❌ Fichiers manquants: {', '.join(missing)}")
        return False
    
    print("\n✓ Structure de l'application valide")
    return True

def check_app_creation():
    """Verifie que l'application Flask peut etre creee"""
    print("\nVerification de la creation de l'application...")
    
    try:
        from app import create_app
        app = create_app()
        print("✓ Application Flask creee avec succes")
        print(f"✓ Routes enregistrees: {len(app.blueprints)} blueprints")
        return True
    except Exception as e:
        print(f"✗ Erreur lors de la creation de l'application: {e}")
        return False

def main():
    """Point d'entree principal"""
    print("=== Verification du Service Orders Python ===\n")
    
    checks = [
        check_imports,
        check_app_structure,
        check_app_creation
    ]
    
    results = [check() for check in checks]
    
    print("\n" + "="*50)
    if all(results):
        print("✅ Toutes les verifications sont passees!")
        print("\nVous pouvez demarrer le service avec:")
        print("  python run.py")
        return 0
    else:
        print("❌ Certaines verifications ont echoue")
        return 1

if __name__ == '__main__':
    sys.exit(main())
