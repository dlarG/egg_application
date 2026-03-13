import bcrypt
from config.database import db

class User:
    def __init__(self):
        self.connection = db.connect()
    
    def create_user(self, username, password):
        try:
            cursor = self.connection.cursor()
            
            # Hash password
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            
            cursor.execute("""
                INSERT INTO users (username, password, role_type, created_at)
                VALUES (%s, %s, %s, NOW())
                RETURNING user_id, username, role_type, created_at
            """, (username, hashed_password.decode('utf-8'), 'staff'))
            
            user = cursor.fetchone()
            self.connection.commit()
            return user
        except Exception as e:
            self.connection.rollback()
            raise e

    def find_by_username(self, username):
        try:
            cursor = self.connection.cursor()
            cursor.execute("""
                SELECT user_id, username, password, role_type, created_at
                FROM users WHERE username = %s AND deleted_at IS NULL
            """, (username,))
            return cursor.fetchone()
        except Exception as e:
            raise e
    
    def verify_password(self, password, hashed_password):
        return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))