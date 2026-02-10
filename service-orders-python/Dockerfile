FROM python:3.11-slim

WORKDIR /app

# Installation des dependances systeme
RUN apt-get update && apt-get install -y \
    gcc \
    libxml2-dev \
    libxslt-dev \
    && rm -rf /var/lib/apt/lists/*

# Copie des fichiers de dependances
COPY requirements.txt .

# Installation des dependances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copie du code de l'application
COPY . .

# Port expose
EXPOSE 5001

# Variable d'environnement
ENV FLASK_APP=run.py
ENV PYTHONUNBUFFERED=1

# Commande de demarrage
CMD ["python", "run.py"]
