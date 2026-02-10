# Stage 1: Construction
FROM python:3.9-slim as builder

# Definition du repertoire de travail
WORKDIR /app

# Copie des fichiers de dependances
COPY requirements.txt .

# Installation des dependances
RUN pip install --no-cache-dir --user -r requirements.txt

# Stage 2: Production
FROM python:3.9-slim

# Definition du repertoire de travail
WORKDIR /app

# Copie des dependances installees depuis le stage de construction
COPY --from=builder /root/.local /root/.local

# Ajout du chemin des binaires Python au PATH
ENV PATH=/root/.local/bin:$PATH

# Copie du code de l'application
COPY . .

# Exposition du port 5000
EXPOSE 5000

# Variables d'environnement par defaut
ENV FLASK_APP=run.py
ENV PYTHONUNBUFFERED=1

# Commande de demarrage de l'application
CMD ["python", "run.py"]
