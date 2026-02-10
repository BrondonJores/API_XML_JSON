#!/usr/bin/env python3
"""
Script de test des endpoints du service Orders
"""

import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_health():
    """Test de l'endpoint de santé"""
    print("Test de l'endpoint de santé...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_create_order():
    """Test de création de commande"""
    print("Test de création de commande...")
    order_data = {
        "user_id": 1,
        "items": [
            {"menu_item_id": 1, "quantity": 2},
            {"menu_item_id": 2, "quantity": 1}
        ]
    }
    response = requests.post(f"{BASE_URL}/orders", json=order_data)
    print(f"Status: {response.status_code}")
    if response.status_code == 201:
        data = response.json()
        print(f"Commande créée: ID={data['id']}, Total={data['total_price']}")
        return data['id']
    else:
        print(f"Erreur: {response.text}")
    print()
    return None

def test_get_order(order_id):
    """Test de récupération d'une commande"""
    print(f"Test de récupération de la commande {order_id}...")
    response = requests.get(f"{BASE_URL}/orders/{order_id}")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Commande: {json.dumps(response.json(), indent=2)}")
    else:
        print(f"Erreur: {response.text}")
    print()

def test_xml_to_json():
    """Test de conversion XML vers JSON"""
    print("Test de conversion XML vers JSON...")
    xml_data = """<?xml version="1.0"?>
    <order>
        <user_id>1</user_id>
        <items>
            <item>
                <menu_item_id>1</menu_item_id>
                <quantity>2</quantity>
                <price>10.50</price>
            </item>
        </items>
    </order>"""
    response = requests.post(
        f"{BASE_URL}/convert/xml-to-json",
        data=xml_data,
        headers={'Content-Type': 'application/xml'}
    )
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Résultat: {json.dumps(response.json(), indent=2)}")
    else:
        print(f"Erreur: {response.text}")
    print()

def test_json_to_xml():
    """Test de conversion JSON vers XML"""
    print("Test de conversion JSON vers XML...")
    json_data = {
        "user_id": 1,
        "status": "pending",
        "items": [
            {"menu_item_id": 1, "quantity": 2, "price": 10.50}
        ]
    }
    response = requests.post(f"{BASE_URL}/convert/json-to-xml", json=json_data)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Résultat XML:\n{response.text}")
    else:
        print(f"Erreur: {response.text}")
    print()

def test_validate_json():
    """Test de validation JSON"""
    print("Test de validation JSON...")
    valid_data = {
        "user_id": 1,
        "items": [
            {"menu_item_id": 1, "quantity": 2, "price": 10.50}
        ]
    }
    response = requests.post(f"{BASE_URL}/validate/order-json", json=valid_data)
    print(f"Status: {response.status_code}")
    print(f"Résultat: {response.json()}")
    print()

def test_queue_status():
    """Test du statut de la file d'attente"""
    print("Test du statut de la file...")
    response = requests.get(f"{BASE_URL}/queue/status")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"File d'attente: {json.dumps(response.json(), indent=2)}")
    else:
        print(f"Erreur: {response.text}")
    print()

def test_recommendations(user_id=1):
    """Test des recommandations"""
    print(f"Test des recommandations pour l'utilisateur {user_id}...")
    response = requests.get(f"{BASE_URL}/recommendations/{user_id}")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Recommandations: {json.dumps(response.json(), indent=2)}")
    else:
        print(f"Erreur: {response.text}")
    print()

if __name__ == "__main__":
    print("=== Tests du service Orders & Queue Management ===\n")
    
    try:
        test_health()
        order_id = test_create_order()
        if order_id:
            test_get_order(order_id)
        test_xml_to_json()
        test_json_to_xml()
        test_validate_json()
        test_queue_status()
        test_recommendations()
        
        print("=== Tests terminés ===")
    except requests.exceptions.ConnectionError:
        print("ERREUR: Impossible de se connecter au service.")
        print("Assurez-vous que le service est démarré sur http://localhost:5000")
