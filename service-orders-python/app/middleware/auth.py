"""
Middleware d'authentification JWT
"""
from functools import wraps
from flask import request, jsonify, current_app
import jwt
from datetime import datetime, timedelta

def require_auth(f):
    """
    Decorateur pour proteger les routes avec authentification JWT
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        
        # Recuperer le token depuis le header Authorization
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]  # Format: "Bearer <token>"
            except IndexError:
                return jsonify({'error': 'Format du token invalide'}), 401
        
        if not token:
            return jsonify({'error': 'Token manquant'}), 401
        
        try:
            # Decoder et valider le token
            payload = jwt.decode(
                token,
                current_app.config['JWT_SECRET'],
                algorithms=[current_app.config.get('JWT_ALGORITHM', 'HS256')]
            )
            
            # Ajouter les informations utilisateur a la requete
            request.user_id = payload.get('user_id')
            request.user_role = payload.get('role')
            
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expire'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Token invalide'}), 401
        except Exception as e:
            # Logger l'erreur pour le monitoring
            current_app.logger.error(f'Erreur d\'authentification: {str(e)}')
            return jsonify({'error': 'Erreur d\'authentification'}), 401
        
        return f(*args, **kwargs)
    
    return decorated_function


def require_role(*roles):
    """
    Decorateur pour verifier le role de l'utilisateur
    Usage: @require_role('admin', 'staff')
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user_role = getattr(request, 'user_role', None)
            
            if not user_role:
                return jsonify({'error': 'Role utilisateur non trouve'}), 403
            
            if user_role not in roles:
                return jsonify({'error': 'Permissions insuffisantes'}), 403
            
            return f(*args, **kwargs)
        
        return decorated_function
    return decorator


def generate_token(user_id, role='user', expiration_hours=None):
    """
    Generer un token JWT
    """
    if expiration_hours is None:
        expiration_hours = current_app.config.get('JWT_EXPIRATION_HOURS', 24)
    
    payload = {
        'user_id': user_id,
        'role': role,
        'exp': datetime.utcnow() + timedelta(hours=expiration_hours),
        'iat': datetime.utcnow()
    }
    
    token = jwt.encode(
        payload,
        current_app.config['JWT_SECRET'],
        algorithm=current_app.config.get('JWT_ALGORITHM', 'HS256')
    )
    
    return token
