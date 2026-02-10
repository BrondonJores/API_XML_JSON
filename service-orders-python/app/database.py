import pymysql
from pymysql.cursors import DictCursor
from contextlib import contextmanager
from app.config import Config

class Database:
    """Gestionnaire de connexion à la base de données MySQL"""
    
    @staticmethod
    def get_connection():
        """Crée et retourne une nouvelle connexion à la base de données"""
        return pymysql.connect(
            host=Config.DB_HOST,
            port=Config.DB_PORT,
            user=Config.DB_USER,
            password=Config.DB_PASSWORD,
            database=Config.DB_NAME,
            cursorclass=DictCursor,
            autocommit=False
        )
    
    @staticmethod
    @contextmanager
    def get_cursor(commit=False):
        """Context manager pour gérer automatiquement les connexions et curseurs"""
        connection = Database.get_connection()
        cursor = connection.cursor()
        try:
            yield cursor
            if commit:
                connection.commit()
        except Exception as e:
            connection.rollback()
            raise e
        finally:
            cursor.close()
            connection.close()
    
    @staticmethod
    def init_database():
        """Initialise les tables de la base de données"""
        with Database.get_cursor(commit=True) as cursor:
            # Table orders
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS orders (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT NOT NULL,
                    status VARCHAR(50) NOT NULL DEFAULT 'pending',
                    total_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_user_id (user_id),
                    INDEX idx_status (status),
                    INDEX idx_created_at (created_at)
                )
            """)
            
            # Table order_items
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS order_items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    order_id INT NOT NULL,
                    menu_item_id INT NOT NULL,
                    quantity INT NOT NULL DEFAULT 1,
                    price DECIMAL(10, 2) NOT NULL,
                    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
                    INDEX idx_order_id (order_id)
                )
            """)
            
            # Table queue
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS queue (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT NOT NULL UNIQUE,
                    order_id INT,
                    position INT NOT NULL,
                    status VARCHAR(50) NOT NULL DEFAULT 'waiting',
                    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
                    INDEX idx_user_id (user_id),
                    INDEX idx_position (position),
                    INDEX idx_status (status)
                )
            """)
