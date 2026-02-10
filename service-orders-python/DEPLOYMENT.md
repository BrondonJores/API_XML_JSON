# Guide de Deploiement - Service Orders Python

## Deploiement Local

### Prerequis
- Python 3.11+
- MySQL 8.0+
- pip

### Etapes

1. **Installation des dependances**
```bash
pip install -r requirements.txt
```

2. **Configuration**
```bash
cp .env.example .env
# Editer .env avec vos parametres
```

3. **Creation de la base de donnees**
```bash
mysql -u root -p < database.sql
```

4. **Demarrage**
```bash
python run.py
```

Le service sera disponible sur http://localhost:5001

## Deploiement Docker

### Construction de l'image

```bash
docker build -t orders-service:latest .
```

### Execution du conteneur

```bash
docker run -d \
  --name orders-service \
  -p 5001:5001 \
  --env-file .env \
  orders-service:latest
```

### Avec Docker Compose

Creer un fichier `docker-compose.yml`:

```yaml
version: '3.8'

services:
  orders-service:
    build: .
    ports:
      - "5001:5001"
    environment:
      - FLASK_ENV=production
      - DB_HOST=mysql
      - DB_PORT=3306
      - DB_NAME=canteen_db
      - DB_USER=root
      - DB_PASSWORD=secret
    depends_on:
      - mysql
    networks:
      - canteen-network

  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=secret
      - MYSQL_DATABASE=canteen_db
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - canteen-network

volumes:
  mysql-data:

networks:
  canteen-network:
```

Demarrer avec:
```bash
docker-compose up -d
```

## Deploiement Production

### Avec Gunicorn

1. Installer Gunicorn:
```bash
pip install gunicorn
```

2. Creer un fichier `wsgi.py`:
```python
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run()
```

3. Lancer avec Gunicorn:
```bash
gunicorn -w 4 -b 0.0.0.0:5001 wsgi:app
```

### Configuration Nginx

```nginx
server {
    listen 80;
    server_name orders.example.com;

    location / {
        proxy_pass http://localhost:5001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Systemd Service

Creer `/etc/systemd/system/orders-service.service`:

```ini
[Unit]
Description=Orders Service Python
After=network.target mysql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/orders-service
Environment="PATH=/opt/orders-service/venv/bin"
ExecStart=/opt/orders-service/venv/bin/gunicorn -w 4 -b 0.0.0.0:5001 wsgi:app
Restart=always

[Install]
WantedBy=multi-user.target
```

Activer et demarrer:
```bash
sudo systemctl enable orders-service
sudo systemctl start orders-service
```

## Variables d'Environnement

Variables requises en production:
- `FLASK_ENV=production`
- `SECRET_KEY` (generer avec `python -c "import secrets; print(secrets.token_hex(32))"`)
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `MENU_SERVICE_URL`

## Monitoring

### Logs

Les logs sont ecrits sur stdout/stderr. Pour les capturer:

```bash
# Avec systemd
journalctl -u orders-service -f

# Avec Docker
docker logs -f orders-service
```

### Health Check

```bash
curl http://localhost:5001/health
```

Response:
```json
{
  "status": "healthy",
  "service": "orders-python"
}
```

## Securite

### Checklist de securite

- [ ] SECRET_KEY unique et complexe
- [ ] Pas de credentials dans le code
- [ ] HTTPS en production
- [ ] Firewall configure (port 5001 uniquement accessible en interne)
- [ ] Base de donnees avec mot de passe fort
- [ ] Utilisateur MySQL avec privileges limites
- [ ] Logs securises
- [ ] Mises a jour regulieres des dependances

### Scan de vulnerabilites

```bash
pip install safety
safety check -r requirements.txt
```

## Performance

### Recommandations

1. **Workers Gunicorn**: 2-4 x nombre de cores CPU
2. **Connection Pool MySQL**: Configurer dans PyMySQL
3. **Cache**: Implementer Redis pour les requetes frequentes
4. **CDN**: Pour les fichiers statiques si applicable

### Monitoring Performance

Installer et utiliser:
- Flask-Profiler pour profiling
- Prometheus + Grafana pour metriques
- New Relic ou DataDog pour APM

## Sauvegarde

### Base de donnees

```bash
# Sauvegarde
mysqldump -u root -p canteen_db > backup_$(date +%Y%m%d).sql

# Restauration
mysql -u root -p canteen_db < backup_20240210.sql
```

### Automatisation

Creer un cron job:
```bash
0 2 * * * /opt/scripts/backup-orders-db.sh
```

## Troubleshooting

### Service ne demarre pas

1. Verifier les logs
2. Verifier la connexion BD
3. Verifier les dependances
4. Verifier les permissions

### Erreurs de connexion BD

```bash
# Tester la connexion
mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME
```

### Performance lente

1. Analyser les requetes lentes MySQL
2. Ajouter des indexes si necessaire
3. Augmenter le nombre de workers
4. Verifier les ressources serveur

## Mise a jour

### Procedure

1. Sauvegarder la BD
2. Tester en preprod
3. Planifier une fenetre de maintenance
4. Deployer la nouvelle version
5. Verifier les health checks
6. Monitorer les erreurs

### Rollback

```bash
# Avec Docker
docker stop orders-service
docker run -d --name orders-service orders-service:previous-version

# Avec systemd
cd /opt/orders-service
git checkout previous-version
sudo systemctl restart orders-service
```

## Support

Pour toute question ou probleme:
1. Consulter les logs
2. Verifier la documentation
3. Contacter l'equipe de developpement
