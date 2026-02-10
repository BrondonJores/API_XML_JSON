from datetime import datetime
from decimal import Decimal

def format_datetime(dt):
    """Formate une datetime en ISO 8601"""
    if isinstance(dt, datetime):
        return dt.isoformat()
    return str(dt)

def format_decimal(value):
    """Formate un Decimal en float"""
    if isinstance(value, Decimal):
        return float(value)
    return value

def sanitize_xml_string(text):
    """Nettoie une chaîne pour l'utilisation dans XML"""
    if not text:
        return ""
    
    # Remplace les caractères spéciaux XML
    replacements = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;'
    }
    
    for old, new in replacements.items():
        text = text.replace(old, new)
    
    return text

def calculate_order_total(items):
    """Calcule le total d'une commande"""
    total = 0.0
    for item in items:
        price = float(item.get('price', 0))
        quantity = int(item.get('quantity', 1))
        total += price * quantity
    return round(total, 2)

def validate_items(items):
    """Valide la structure des articles d'une commande"""
    if not items or not isinstance(items, list):
        return False, "Les articles doivent être une liste non vide"
    
    for item in items:
        if not isinstance(item, dict):
            return False, "Chaque article doit être un objet"
        
        if 'menu_item_id' not in item:
            return False, "menu_item_id est requis pour chaque article"
        
        if 'quantity' not in item or item['quantity'] < 1:
            return False, "quantity doit être au moins 1"
    
    return True, "Valide"
