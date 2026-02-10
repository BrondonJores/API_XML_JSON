#!/bin/bash

# Script de vérification de l'intégrité du projet Gateway Service

echo "=========================================="
echo "Vérification du Gateway Service Laravel"
echo "=========================================="
echo ""

ERRORS=0

# Vérification des fichiers essentiels
echo "1. Vérification des fichiers essentiels..."

REQUIRED_FILES=(
    "composer.json"
    "artisan"
    ".env.example"
    ".gitignore"
    "README.md"
    "public/index.php"
    "bootstrap/app.php"
    "routes/api.php"
    "config/app.php"
    "config/database.php"
    "config/services.php"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "   ❌ Fichier manquant : $file"
        ERRORS=$((ERRORS + 1))
    fi
done

if [ $ERRORS -eq 0 ]; then
    echo "   ✓ Tous les fichiers essentiels sont présents"
fi

echo ""
echo "2. Vérification des contrôleurs..."

CONTROLLERS=(
    "app/Http/Controllers/AuthController.php"
    "app/Http/Controllers/ProfileController.php"
    "app/Http/Controllers/ProxyController.php"
)

for controller in "${CONTROLLERS[@]}"; do
    if [ ! -f "$controller" ]; then
        echo "   ❌ Contrôleur manquant : $controller"
        ERRORS=$((ERRORS + 1))
    fi
done

if [ $ERRORS -eq 0 ]; then
    echo "   ✓ Tous les contrôleurs sont présents"
fi

echo ""
echo "3. Vérification des modèles..."

MODELS=(
    "app/Models/User.php"
    "app/Models/UserProfile.php"
    "app/Models/UserAllergy.php"
    "app/Models/UserPreference.php"
)

for model in "${MODELS[@]}"; do
    if [ ! -f "$model" ]; then
        echo "   ❌ Modèle manquant : $model"
        ERRORS=$((ERRORS + 1))
    fi
done

if [ $ERRORS -eq 0 ]; then
    echo "   ✓ Tous les modèles sont présents"
fi

echo ""
echo "4. Vérification des services..."

SERVICES=(
    "app/Services/AuthService.php"
    "app/Services/MenuClient.php"
    "app/Services/OrderClient.php"
)

for service in "${SERVICES[@]}"; do
    if [ ! -f "$service" ]; then
        echo "   ❌ Service manquant : $service"
        ERRORS=$((ERRORS + 1))
    fi
done

if [ $ERRORS -eq 0 ]; then
    echo "   ✓ Tous les services sont présents"
fi

echo ""
echo "5. Vérification des migrations..."

MIGRATIONS=(
    "database/migrations/2024_01_01_000001_create_users_table.php"
    "database/migrations/2024_01_01_000002_create_user_profiles_table.php"
    "database/migrations/2024_01_01_000003_create_user_allergies_table.php"
    "database/migrations/2024_01_01_000004_create_user_preferences_table.php"
    "database/migrations/2024_01_01_000005_create_api_logs_table.php"
    "database/migrations/2024_01_01_000006_create_personal_access_tokens_table.php"
)

for migration in "${MIGRATIONS[@]}"; do
    if [ ! -f "$migration" ]; then
        echo "   ❌ Migration manquante : $migration"
        ERRORS=$((ERRORS + 1))
    fi
done

if [ $ERRORS -eq 0 ]; then
    echo "   ✓ Toutes les migrations sont présentes"
fi

echo ""
echo "6. Vérification des middleware..."

MIDDLEWARE=(
    "app/Http/Middleware/Authenticate.php"
    "app/Http/Middleware/AdminMiddleware.php"
)

for mw in "${MIDDLEWARE[@]}"; do
    if [ ! -f "$mw" ]; then
        echo "   ❌ Middleware manquant : $mw"
        ERRORS=$((ERRORS + 1))
    fi
done

if [ $ERRORS -eq 0 ]; then
    echo "   ✓ Tous les middleware sont présents"
fi

echo ""
echo "7. Vérification des répertoires de stockage..."

STORAGE_DIRS=(
    "storage/logs"
    "storage/framework/cache"
    "storage/framework/sessions"
    "storage/framework/views"
    "storage/app"
    "bootstrap/cache"
)

for dir in "${STORAGE_DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
        echo "   ❌ Répertoire manquant : $dir"
        ERRORS=$((ERRORS + 1))
    fi
done

if [ $ERRORS -eq 0 ]; then
    echo "   ✓ Tous les répertoires de stockage sont présents"
fi

echo ""
echo "8. Vérification des fichiers Docker..."

DOCKER_FILES=(
    "Dockerfile"
    "docker-compose.local.yml"
    ".dockerignore"
)

for file in "${DOCKER_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "   ❌ Fichier Docker manquant : $file"
        ERRORS=$((ERRORS + 1))
    fi
done

if [ $ERRORS -eq 0 ]; then
    echo "   ✓ Tous les fichiers Docker sont présents"
fi

echo ""
echo "9. Vérification de la documentation..."

DOC_FILES=(
    "README.md"
    "API_DOCUMENTATION.md"
    "INSTALL.md"
    "TESTING.md"
    "PROJECT_SUMMARY.md"
    "CHANGELOG.md"
)

for file in "${DOC_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "   ❌ Documentation manquante : $file"
        ERRORS=$((ERRORS + 1))
    fi
done

if [ $ERRORS -eq 0 ]; then
    echo "   ✓ Toute la documentation est présente"
fi

echo ""
echo "10. Vérification des permissions..."

if [ ! -x "artisan" ]; then
    echo "   ❌ Le fichier artisan n'est pas exécutable"
    ERRORS=$((ERRORS + 1))
fi

if [ ! -x "start.sh" ]; then
    echo "   ❌ Le fichier start.sh n'est pas exécutable"
    ERRORS=$((ERRORS + 1))
fi

if [ ! -x "init.sh" ]; then
    echo "   ❌ Le fichier init.sh n'est pas exécutable"
    ERRORS=$((ERRORS + 1))
fi

if [ $ERRORS -eq 0 ]; then
    echo "   ✓ Toutes les permissions sont correctes"
fi

echo ""
echo "=========================================="
if [ $ERRORS -eq 0 ]; then
    echo "✓ Vérification réussie ! Projet complet."
else
    echo "❌ $ERRORS erreur(s) détectée(s)"
fi
echo "=========================================="
echo ""

# Statistiques du projet
echo "Statistiques du projet :"
echo "  - Fichiers PHP : $(find . -name "*.php" ! -path "./vendor/*" | wc -l)"
echo "  - Lignes de code : $(find . -name "*.php" ! -path "./vendor/*" -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}')"
echo "  - Contrôleurs : $(find app/Http/Controllers -name "*.php" 2>/dev/null | wc -l)"
echo "  - Modèles : $(find app/Models -name "*.php" 2>/dev/null | wc -l)"
echo "  - Migrations : $(find database/migrations -name "*.php" 2>/dev/null | wc -l)"
echo "  - Middleware : $(find app/Http/Middleware -name "*.php" 2>/dev/null | wc -l)"
echo ""

exit $ERRORS
