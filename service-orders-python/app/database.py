"""
Module de gestion de connexion a la base de donnees MySQL
"""

import pymysql
from flask import current_app
from contextlib import contextmanager


def get_db_connection():
    """
    Etablit et retourne une connexion a la base de donnees MySQL
    
    Returns:
        Objet de connexion PyMySQL
        
    Raises:
        pymysql.Error: En cas d'erreur de connexion
    """
    try:
        connection = pymysql.connect(
            host=current_app.config['DB_HOST'],
            port=current_app.config['DB_PORT'],
            user=current_app.config['DB_USER'],
            password=current_app.config['DB_PASSWORD'],
            database=current_app.config['DB_NAME'],
            cursorclass=pymysql.cursors.DictCursor,
            autocommit=False
        )
        return connection
    except pymysql.Error as e:
        current_app.logger.error(f"Erreur de connexion a la base de donnees: {e}")
        raise


@contextmanager
def get_db_cursor():
    """
    Context manager pour gerer automatiquement la connexion et le curseur
    
    Yields:
        Curseur de base de donnees
        
    Example:
        with get_db_cursor() as cursor:
            cursor.execute("SELECT * FROM orders")
            results = cursor.fetchall()
    """
    connection = None
    cursor = None
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        yield cursor
        connection.commit()
    except Exception as e:
        if connection:
            connection.rollback()
        current_app.logger.error(f"Erreur lors de l'execution de la requete: {e}")
        raise
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
