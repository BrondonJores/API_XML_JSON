# Structure du Projet Frontend React

## Vue d'ensemble

Application React 18 complète avec 93 fichiers organisés de manière modulaire.

## Statistiques

- **Composants UI**: 9 composants réutilisables
- **Composants Layout**: 5 composants de mise en page
- **Composants Forms**: 6 composants de formulaires
- **Composants Menu**: 6 composants spécifiques au menu
- **Composants Orders**: 4 composants de commandes
- **Composants Charts**: 4 composants de graphiques
- **Composants Common**: 5 composants communs
- **Pages Public**: 5 pages publiques
- **Pages Auth**: 4 pages d'authentification
- **Pages User**: 7 pages utilisateur
- **Pages Admin**: 4 pages administrateur
- **Pages Tools**: 1 page d'outils (convertisseur)
- **Services**: 5 services API
- **Stores**: 2 stores Zustand
- **Hooks**: 3 hooks personnalisés
- **Utils**: 3 fichiers utilitaires

## Arborescence Complète

```
service-frontend-react/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/                    # Composants UI de base
│   │   │   ├── Alert.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   └── Tabs.jsx
│   │   ├── layout/                # Composants de layout
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── forms/                 # Composants de formulaires
│   │   │   ├── Checkbox.jsx
│   │   │   ├── DatePicker.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Stepper.jsx
│   │   │   └── Textarea.jsx
│   │   ├── menu/                  # Composants menu
│   │   │   ├── AllergenFilter.jsx
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── MealCard.jsx
│   │   │   ├── MealGrid.jsx
│   │   │   ├── NutritionalTable.jsx
│   │   │   └── PriceRangeSlider.jsx
│   │   ├── orders/                # Composants commandes
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   ├── OrderCard.jsx
│   │   │   └── OrderTimeline.jsx
│   │   ├── charts/                # Composants graphiques
│   │   │   ├── BarChart.jsx
│   │   │   ├── LineChart.jsx
│   │   │   ├── PieChart.jsx
│   │   │   └── StatsCard.jsx
│   │   └── common/                # Composants communs
│   │       ├── EmptyState.jsx
│   │       ├── ProgressBar.jsx
│   │       ├── QRCodeDisplay.jsx
│   │       ├── RatingStars.jsx
│   │       └── SearchBar.jsx
│   ├── pages/
│   │   ├── public/                # Pages publiques
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── MealDetail.jsx
│   │   │   └── Menu.jsx
│   │   ├── auth/                  # Pages authentification
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── user/                  # Pages utilisateur
│   │   │   ├── Favorites.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   ├── Order.jsx
│   │   │   ├── OrderDetail.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ProfileEdit.jsx
│   │   │   └── QueueStatus.jsx
│   │   ├── admin/                 # Pages admin
│   │   │   ├── Analytics.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MealManagement.jsx
│   │   │   └── UsersManagement.jsx
│   │   └── tools/                 # Pages outils
│   │       └── XmlConverter.jsx
│   ├── services/                  # Services API
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── converterService.js
│   │   ├── menuService.js
│   │   └── orderService.js
│   ├── store/                     # Stores Zustand
│   │   ├── authStore.js
│   │   └── cartStore.js
│   ├── hooks/                     # Hooks personnalisés
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   └── useDebounce.js
│   ├── utils/                     # Utilitaires
│   │   ├── constants.js
│   │   ├── formatters.js
│   │   └── validators.js
│   ├── routes/                    # Configuration routing
│   │   ├── AdminRoute.jsx
│   │   ├── AppRoutes.jsx
│   │   └── PrivateRoute.jsx
│   ├── styles/                    # Styles globaux
│   │   └── index.css
│   ├── App.jsx                    # Composant principal
│   └── main.jsx                   # Point d'entrée
├── index.html                     # HTML principal
├── package.json                   # Dépendances
├── vite.config.js                 # Config Vite
├── tailwind.config.js             # Config Tailwind
├── postcss.config.js              # Config PostCSS
├── eslint.config.js               # Config ESLint
├── Dockerfile                     # Docker multi-stage
├── nginx.conf                     # Config Nginx
├── .dockerignore                  # Exclusions Docker
├── .gitignore                     # Exclusions Git
├── .env.example                   # Variables d'environnement exemple
├── .env                           # Variables d'environnement
└── README.md                      # Documentation

## Technologies Utilisées

### Core
- React 18.2.0
- React DOM 18.2.0
- Vite 5.0.8

### Routing & State
- React Router DOM 6.20.0
- Zustand 4.4.7 (state management)

### Data Fetching
- @tanstack/react-query 5.12.2
- Axios 1.6.2

### UI & Styling
- Tailwind CSS 3.3.6
- PostCSS 8.4.32
- Autoprefixer 10.4.16
- clsx 2.0.0

### Forms & Validation
- React Hook Form 7.48.2
- Zod 3.22.4
- @hookform/resolvers 3.3.2

### Charts & Visualisation
- Chart.js 4.4.1
- react-chartjs-2 5.2.0

### Utilitaires
- date-fns 3.0.0
- qrcode.react 3.1.0

## Fonctionnalités Principales

### Pour les utilisateurs
- ✅ Navigation et découverte du menu
- ✅ Filtrage par catégorie et allergènes
- ✅ Recherche de plats
- ✅ Détails des plats avec nutrition
- ✅ Gestion du panier
- ✅ Passage de commandes
- ✅ Suivi des commandes en temps réel
- ✅ Historique des commandes
- ✅ Gestion du profil
- ✅ Système de favoris
- ✅ QR codes pour les commandes

### Pour les administrateurs
- ✅ Dashboard avec statistiques
- ✅ Gestion complète des plats (CRUD)
- ✅ Gestion des utilisateurs
- ✅ Analytics et rapports
- ✅ Graphiques interactifs

### Outils
- ✅ Convertisseur XML/JSON bidirectionnel
- ✅ Validation des formats
- ✅ Exemples et documentation

## Caractéristiques Techniques

### Architecture
- ✅ Code splitting automatique
- ✅ Lazy loading des routes
- ✅ Composants réutilisables
- ✅ Séparation des préoccupations
- ✅ Pattern Container/Presentational

### Performance
- ✅ Build optimisé avec Vite
- ✅ Tree shaking
- ✅ Code splitting
- ✅ Compression Gzip
- ✅ Cache des assets statiques
- ✅ Optimisation des images

### Sécurité
- ✅ Protection des routes privées
- ✅ Protection des routes admin
- ✅ Gestion des tokens JWT
- ✅ Refresh token automatique
- ✅ Validation côté client

### UX/UI
- ✅ Design responsive (mobile-first)
- ✅ Interface moderne avec Tailwind
- ✅ Animations fluides
- ✅ États de chargement
- ✅ Gestion des erreurs
- ✅ Messages de feedback
- ✅ Navigation intuitive

### Accessibilité
- ✅ Structure sémantique
- ✅ Navigation au clavier
- ✅ Labels ARIA
- ✅ Contraste des couleurs

## Docker

### Build
```bash
docker build -t service-frontend-react .
```

### Run
```bash
docker run -p 3000:80 service-frontend-react
```

### Features Docker
- Multi-stage build (Node + Nginx)
- Image Alpine légère
- Compression Gzip activée
- Cache des assets optimisé
- Proxy API configuré

## Développement

### Installation
```bash
npm install
```

### Démarrage
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

## Convention de Code

- ✅ Tous les commentaires en français
- ✅ Pas d'emojis dans le code
- ✅ Composants fonctionnels avec hooks
- ✅ Export default pour les composants
- ✅ Named exports pour les utilitaires
- ✅ Props destructurées
- ✅ Code formaté et indenté

## Notes Importantes

### État de l'application
- Les stores Zustand persistent dans localStorage
- Le panier est sauvegardé entre les sessions
- Les tokens sont gérés automatiquement
- Le cache React Query est configuré (5 min)

### Points d'attention
- Vérifier la configuration des variables d'environnement
- Le proxy API doit pointer vers le gateway Laravel
- Les images des plats nécessitent un backend
- Les websockets ne sont pas implémentés (polling à la place)

## TODO Potentiels
- [ ] Tests unitaires (Jest/Vitest)
- [ ] Tests E2E (Playwright/Cypress)
- [ ] Websockets pour temps réel
- [ ] PWA / Service Worker
- [ ] Internationalisation (i18n)
- [ ] Mode sombre
- [ ] Notifications push
