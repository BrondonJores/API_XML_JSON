from app.database import Database
from app.models.order import Order
from app.models.order_item import OrderItem
from app.clients.menu_client import MenuClient
from app.services.queue_service import QueueService

class OrderService:
    """Service de gestion des commandes"""
    
    def __init__(self):
        self.menu_client = MenuClient()
        self.queue_service = QueueService()
    
    def create_order(self, user_id, items):
        """Crée une nouvelle commande avec ses articles"""
        total_price = 0.0
        validated_items = []
        
        # Valide les articles et calcule le prix total
        for item in items:
            menu_item_id = item.get('menu_item_id')
            quantity = item.get('quantity', 1)
            
            # Récupère le prix depuis le service menu
            menu_item = self.menu_client.get_menu_item(menu_item_id)
            if not menu_item:
                raise ValueError(f"Article de menu {menu_item_id} non trouvé")
            
            price = menu_item.get('price', 0.0)
            item_total = price * quantity
            total_price += item_total
            
            validated_items.append({
                'menu_item_id': menu_item_id,
                'quantity': quantity,
                'price': price
            })
        
        # Crée la commande dans la base de données
        with Database.get_cursor(commit=True) as cursor:
            cursor.execute(
                """INSERT INTO orders (user_id, status, total_price) 
                   VALUES (%s, %s, %s)""",
                (user_id, 'pending', total_price)
            )
            order_id = cursor.lastrowid
            
            # Insère les articles de la commande
            for item in validated_items:
                cursor.execute(
                    """INSERT INTO order_items (order_id, menu_item_id, quantity, price) 
                       VALUES (%s, %s, %s, %s)""",
                    (order_id, item['menu_item_id'], item['quantity'], item['price'])
                )
        
        # Ajoute l'utilisateur à la file d'attente
        self.queue_service.add_to_queue(user_id, order_id)
        
        # Récupère et retourne la commande créée
        return self.get_order_by_id(order_id)
    
    def get_order_by_id(self, order_id):
        """Récupère une commande par son ID avec ses articles"""
        with Database.get_cursor() as cursor:
            cursor.execute(
                "SELECT * FROM orders WHERE id = %s",
                (order_id,)
            )
            order_data = cursor.fetchone()
            
            if not order_data:
                return None
            
            # Récupère les articles de la commande
            cursor.execute(
                "SELECT * FROM order_items WHERE order_id = %s",
                (order_id,)
            )
            items_data = cursor.fetchall()
            
            order = Order.from_dict(order_data)
            order.items = [OrderItem.from_dict(item) for item in items_data]
            
            return order
    
    def get_orders_by_user(self, user_id):
        """Récupère toutes les commandes d'un utilisateur"""
        with Database.get_cursor() as cursor:
            cursor.execute(
                "SELECT * FROM orders WHERE user_id = %s ORDER BY created_at DESC",
                (user_id,)
            )
            orders_data = cursor.fetchall()
            
            orders = []
            for order_data in orders_data:
                order = Order.from_dict(order_data)
                
                # Récupère les articles de chaque commande
                cursor.execute(
                    "SELECT * FROM order_items WHERE order_id = %s",
                    (order.id,)
                )
                items_data = cursor.fetchall()
                order.items = [OrderItem.from_dict(item) for item in items_data]
                
                orders.append(order)
            
            return orders
    
    def get_all_orders(self, status=None, limit=None):
        """Récupère toutes les commandes avec filtres optionnels"""
        with Database.get_cursor() as cursor:
            query = "SELECT * FROM orders"
            params = []
            
            if status:
                query += " WHERE status = %s"
                params.append(status)
            
            query += " ORDER BY created_at DESC"
            
            if limit:
                query += " LIMIT %s"
                params.append(limit)
            
            cursor.execute(query, params)
            orders_data = cursor.fetchall()
            
            orders = []
            for order_data in orders_data:
                order = Order.from_dict(order_data)
                
                # Récupère les articles de chaque commande
                cursor.execute(
                    "SELECT * FROM order_items WHERE order_id = %s",
                    (order.id,)
                )
                items_data = cursor.fetchall()
                order.items = [OrderItem.from_dict(item) for item in items_data]
                
                orders.append(order)
            
            return orders
    
    def update_order_status(self, order_id, status):
        """Met à jour le statut d'une commande"""
        with Database.get_cursor(commit=True) as cursor:
            cursor.execute(
                "UPDATE orders SET status = %s WHERE id = %s",
                (status, order_id)
            )
            return cursor.rowcount > 0
