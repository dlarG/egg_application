import psycopg2
from psycopg2.extras import RealDictCursor
import os

class Database:
    def __init__(self):
        self.connection = None
    
    def connect(self):
        try:
            self.connection = psycopg2.connect(
                host='localhost',
                database='postgres',
                user='postgres',
                password='root123',
                port=5432,
                cursor_factory=RealDictCursor
            )
            return self.connection
        except Exception as e:
            print(f"Error connecting to database: {e}")
            return None
    
    def disconnect(self):
        if self.connection:
            self.connection.close()

db = Database()