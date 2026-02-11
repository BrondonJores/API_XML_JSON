# Politique de Sécurité

## Versions Supportées

| Version | Supportée          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Signaler une Vulnérabilité

Si vous découvrez une vulnérabilité de sécurité dans ce projet, merci de nous la signaler de manière responsable.

**Merci d'envoyer un email à :** security@canteen-api.local

Veuillez inclure les informations suivantes dans votre rapport :
- Description de la vulnérabilité
- Étapes pour reproduire le problème
- Impact potentiel
- Suggestions de correction si possible

Nous nous engageons à répondre dans un délai de 48 heures et à travailler avec vous pour résoudre le problème rapidement.

## Bonnes Pratiques de Sécurité

### Pour les Développeurs

1. **Ne jamais commiter de secrets**
   - Utilisez toujours des variables d'environnement
   - Vérifiez que .env est dans .gitignore
   - Utilisez des fichiers .env.example sans valeurs sensibles

2. **Gestion des mots de passe**
   - Minimum 12 caractères
   - Utiliser toujours le hashing (bcrypt, argon2)
   - Ne jamais stocker en clair

3. **Authentification et Autorisation**
   - Implémenter rate limiting sur les endpoints d'authentification
   - Utiliser des tokens JWT avec expiration
   - Vérifier les permissions à chaque requête

4. **Validation des données**
   - Valider toutes les entrées utilisateur côté serveur
   - Utiliser des requêtes préparées (PreparedStatement)
   - Sanitiser les données avant affichage (protection XSS)

5. **Sécurité des API**
   - Utiliser HTTPS en production
   - Configurer CORS avec des origines spécifiques
   - Ajouter les headers de sécurité appropriés

6. **Dépendances**
   - Mettre à jour régulièrement les dépendances
   - Exécuter des audits de sécurité réguliers
   - Utiliser des versions stables et maintenues

### Configuration Sécurisée

#### Variables d'Environnement Requises

**Service Menu (Java):**
```
DB_HOST=mysql-menu
DB_PORT=3306
DB_NAME=canteen_menu
DB_USER=root
DB_PASSWORD=<générer_mot_de_passe_fort>
```

**Service Orders (Python):**
```
DB_HOST=mysql-orders
DB_PORT=3306
DB_NAME=canteen_orders
DB_USER=root
DB_PASSWORD=<générer_mot_de_passe_fort>
SECRET_KEY=<générer_clé_256_bits>
JWT_SECRET=<générer_secret_jwt>
```

**Service Gateway (Laravel):**
```
DB_HOST=mysql-auth
DB_PORT=3306
DB_NAME=canteen_auth
DB_USER=root
DB_PASSWORD=<générer_mot_de_passe_fort>
APP_KEY=<générer_avec_php_artisan_key_generate>
JWT_SECRET=<générer_secret_jwt>
```

**Service Frontend (React):**
```
VITE_API_URL=https://api.canteen.local
```

#### Génération de Secrets Sécurisés

**Pour MySQL:**
```bash
openssl rand -base64 32
```

**Pour Laravel APP_KEY:**
```bash
php artisan key:generate
```

**Pour JWT Secret:**
```bash
openssl rand -hex 64
```

### Headers de Sécurité Recommandés

Tous les services doivent implémenter les headers suivants :

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

### Checklist de Déploiement en Production

Avant de déployer en production, vérifiez :

- [ ] Tous les secrets sont dans des variables d'environnement
- [ ] Les mots de passe par défaut ont été changés
- [ ] HTTPS est activé et forcé
- [ ] Les logs de sécurité sont activés
- [ ] Rate limiting est configuré
- [ ] CORS est configuré avec des origines spécifiques
- [ ] Les headers de sécurité sont présents
- [ ] Les dépendances sont à jour
- [ ] Les tests de sécurité passent
- [ ] Le mode DEBUG est désactivé

### Audit de Sécurité

Ce projet a fait l'objet d'un audit de sécurité complet en février 2026.

**Principales corrections apportées :**
- Suppression de tous les secrets en dur
- Correction des vulnérabilités CORS
- Protection contre les injections SQL
- Protection contre XSS
- Ajout de rate limiting
- Configuration des headers de sécurité
- Protection contre XXE (XML External Entity)
- Validation stricte des entrées utilisateur

### Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
