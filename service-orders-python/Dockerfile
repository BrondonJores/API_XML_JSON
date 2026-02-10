FROM python:3.9-slim

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers de dépendances
COPY requirements.txt .

# Installe les dépendances système nécessaires
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Installe les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copie le code de l'application
COPY . .

# Expose le port 5000
EXPOSE 5000

# Variables d'environnement par défaut
ENV FLASK_APP=run.py
ENV PYTHONUNBUFFERED=1

# Commande de démarrage
CMD ["python", "run.py"]
