# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm ci

# Copie du code source
COPY . .

# Build de l'application
ARG VITE_API_URL=http://localhost:8003
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage 2: Production avec Nginx
FROM nginx:1.25-alpine

# Copie de la configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers buildés depuis le stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposition du port 80
EXPOSE 80

# Commande de démarrage
CMD ["nginx", "-g", "daemon off;"]
