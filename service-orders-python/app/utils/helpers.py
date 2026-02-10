"""
Fonctions utilitaires pour la gestion des requetes et reponses HTTP
"""

from flask import Response, request
import json


def get_content_type(request):
    """
    Extrait le type de contenu demande depuis les headers de la requete
    
    Args:
        request: Objet requete Flask
        
    Returns:
        str: Type de contenu (ex: 'application/xml', 'application/json')
    """
    accept = request.headers.get('Accept', 'application/json')
    return accept


def is_xml_request(request):
    """
    Verifie si la requete demande une reponse au format XML
    
    Args:
        request: Objet requete Flask
        
    Returns:
        bool: True si XML est demande, False sinon
    """
    accept = get_content_type(request)
    return 'xml' in accept.lower()


def is_json_request(request):
    """
    Verifie si la requete demande une reponse au format JSON
    
    Args:
        request: Objet requete Flask
        
    Returns:
        bool: True si JSON est demande, False sinon
    """
    accept = get_content_type(request)
    return 'json' in accept.lower() or accept == '*/*'


def format_response(data, request, xml_root='root'):
    """
    Formate les donnees de reponse selon le type de contenu demande
    
    Args:
        data: Donnees a formater (dict, list ou str)
        request: Objet requete Flask
        xml_root: Nom de l'element racine pour les reponses XML
        
    Returns:
        Response: Objet Response Flask avec le bon type de contenu
    """
    if is_xml_request(request):
        # Si les donnees sont deja au format XML (string)
        if isinstance(data, str):
            return Response(data, mimetype='application/xml')
        
        # Conversion simple dict/list vers XML
        xml_content = dict_to_xml(data, xml_root)
        return Response(xml_content, mimetype='application/xml')
    else:
        # Reponse JSON par defaut
        if isinstance(data, str):
            # Si c'est deja une string, on suppose que c'est du JSON
            return Response(data, mimetype='application/json')
        
        return Response(
            json.dumps(data, indent=2),
            mimetype='application/json'
        )


def dict_to_xml(data, root='root'):
    """
    Convertit un dictionnaire ou une liste en XML
    
    Args:
        data: Donnees a convertir (dict ou list)
        root: Nom de l'element racine
        
    Returns:
        str: Representation XML des donnees
    """
    def build_xml(data, tag='item'):
        if isinstance(data, dict):
            xml = ''
            for key, value in data.items():
                xml += f'<{key}>{build_xml(value, key)}</{key}>'
            return xml
        elif isinstance(data, list):
            xml = ''
            for item in data:
                xml += f'<{tag}>{build_xml(item, tag)}</{tag}>'
            return xml
        else:
            return str(data)
    
    xml_declaration = '<?xml version="1.0" encoding="UTF-8"?>'
    xml_content = f'<{root}>{build_xml(data, root)}</{root}>'
    return xml_declaration + xml_content
