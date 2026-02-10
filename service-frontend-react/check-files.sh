#!/bin/bash
echo "Vérification des fichiers requis..."
echo ""

REQUIRED_FILES=(
  # Config
  "package.json"
  "vite.config.js"
  "tailwind.config.js"
  "postcss.config.js"
  ".env.example"
  ".gitignore"
  "README.md"
  
  # Public
  "index.html"
  "public/favicon.ico"
  
  # Entry
  "src/main.jsx"
  "src/App.jsx"
  "src/styles/index.css"
  
  # Services
  "src/services/api.js"
  "src/services/authService.js"
  "src/services/menuService.js"
  "src/services/orderService.js"
  "src/services/converterService.js"
  
  # Store
  "src/store/authStore.js"
  "src/store/cartStore.js"
  
  # Hooks
  "src/hooks/useAuth.js"
  "src/hooks/useCart.js"
  "src/hooks/useDebounce.js"
  
  # Utils
  "src/utils/formatters.js"
  "src/utils/validators.js"
  "src/utils/constants.js"
  
  # Routes
  "src/routes/AppRoutes.jsx"
  "src/routes/PrivateRoute.jsx"
  "src/routes/AdminRoute.jsx"
  
  # Docker
  "Dockerfile"
  "nginx.conf"
  ".dockerignore"
)

MISSING=0
for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ $file"
  else
    echo "✗ $file MANQUANT"
    MISSING=$((MISSING+1))
  fi
done

echo ""
if [ $MISSING -eq 0 ]; then
  echo "✓ Tous les fichiers requis sont présents!"
else
  echo "✗ $MISSING fichier(s) manquant(s)"
  exit 1
fi
