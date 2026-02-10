# Service Frontend React

Application React 18 moderne pour le système de gestion de restaurant avec conversion XML/JSON.

## Technologies

- **React 18** - Bibliothèque UI
- **Vite** - Build tool rapide
- **React Router DOM 6** - Routing
- **Zustand** - State management
- **React Query** - Data fetching et cache
- **Tailwind CSS** - Styling
- **Chart.js** - Graphiques et analytics
- **Axios** - Client HTTP
- **React Hook Form** - Gestion de formulaires
- **Zod** - Validation de schémas

## Installation

```bash
npm install
```

## Configuration

Copier `.env.example` vers `.env` et configurer les variables:

```bash
cp .env.example .env
```

## Développement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## Build Production

```bash
npm run build
```

## Docker

### Build l'image

```bash
docker build -t service-frontend-react .
```

### Exécuter le conteneur

```bash
docker run -p 3000:80 service-frontend-react
```

## Structure du Projet

```
src/
├── components/      # Composants réutilisables
│   ├── ui/         # Composants UI de base
│   ├── layout/     # Composants de mise en page
│   ├── forms/      # Composants de formulaires
│   ├── menu/       # Composants spécifiques au menu
│   ├── orders/     # Composants de commandes
│   ├── charts/     # Composants de graphiques
│   └── common/     # Composants communs
├── pages/          # Pages de l'application
│   ├── public/     # Pages publiques
│   ├── auth/       # Pages d'authentification
│   ├── user/       # Pages utilisateur
│   ├── admin/      # Pages administrateur
│   └── tools/      # Pages d'outils
├── services/       # Services API
├── store/          # Stores Zustand
├── hooks/          # Hooks personnalisés
├── utils/          # Utilitaires
├── routes/         # Configuration des routes
└── styles/         # Styles globaux
```

## Fonctionnalités

### Utilisateur
- Parcourir le menu avec filtres avancés
- Voir les détails des plats (allergènes, nutrition)
- Passer des commandes
- Suivre le statut des commandes en temps réel
- Voir l'historique des commandes
- Gérer le profil
- Ajouter des favoris

### Administrateur
- Dashboard avec analytics
- Gestion des plats (CRUD)
- Gestion des utilisateurs
- Statistiques et rapports

### Outils
- Convertisseur XML/JSON bidirectionnel
- Génération de QR codes

## API Endpoints

L'application communique avec:
- Gateway API: `/api` (proxy vers service-gateway-laravel)
- Menu Service: `/api/menu`
- Orders Service: `/api/orders`

## Authentification

L'authentification utilise JWT tokens:
- Access token stocké dans le store Zustand
- Refresh token dans httpOnly cookie
- Auto-refresh des tokens expirés

## Responsive Design

L'application est entièrement responsive:
- Mobile-first design
- Breakpoints Tailwind (sm, md, lg, xl, 2xl)
- Navigation adaptative

## Performance

- Code splitting automatique
- Lazy loading des routes
- Optimisation des images
- Mise en cache avec React Query
- Debouncing des recherches

## Licence

MIT
