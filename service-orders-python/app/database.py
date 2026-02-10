"""
Gestion de la connexion a la base de donnees
"""
import pymysql
from pymysql.cursors import DictCursor
from contextlib import contextmanager
from app.config import Config

class Database:
    """
    Gestionnaire de connexion a la base de donnees MySQL
    """
    
    @staticmethod
    def get_connection():
        """
        Cree une nouvelle connexion a la base de donnees
        """
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
        """
        Gestionnaire de contexte pour les curseurs de base de donnees
        
        Args:
            commit: Si True, commit automatiquement a la fin
        """
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
