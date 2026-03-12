import bcrypt
from datetime import datetime
from config.database import db

class User:
    def __init__(self):
        self.connection = db.connect()
    
    def create_user(self, username, password, role_type='staff', **kwargs):
        try:
            cursor = self.connection.cursor()
            
            # Hash password
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            
            cursor.execute("""
                INSERT INTO users (username, password, role_type, first_name, middle_name, 
                                 last_name, contact_number, birthdate, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW())
                RETURNING user_id, username, role_type, first_name, last_name, created_at
            """, (
                username, 
                hashed_password.decode('utf-8'), 
                role_type,
                kwargs.get('first_name'),
                kwargs.get('middle_name'),
                kwargs.get('last_name'),
                kwargs.get('contact_number'),
                kwargs.get('birthdate')
            ))
            
            user = cursor.fetchone()
            self.connection.commit()
            return user
        except Exception as e:
            self.connection.rollback()
            raise e

    def get_all_users(self):
        try:
            cursor = self.connection.cursor()
            cursor.execute("""
                SELECT user_id, username, first_name, middle_name, last_name, 
                       contact_number, birthdate, role_type, created_at, updated_at
                FROM users 
                WHERE deleted_at IS NULL
                ORDER BY created_at DESC
            """)
            
            columns = [desc[0] for desc in cursor.description]
            users = []
            
            for row in cursor.fetchall():
                user = dict(zip(columns, row))
                # Calculate last login (you might want to track this in a separate table)
                user['last_login'] = user['updated_at'] or user['created_at']
                user['status'] = 'active'  # You can implement status logic
                users.append(user)
            
            return users
        except Exception as e:
            raise e

    def get_user_by_id(self, user_id):
        try:
            cursor = self.connection.cursor()
            cursor.execute("""
                SELECT user_id, username, first_name, middle_name, last_name, 
                       contact_number, birthdate, role_type, created_at, updated_at
                FROM users 
                WHERE user_id = %s AND deleted_at IS NULL
            """, (user_id,))
            
            user_data = cursor.fetchone()
            if not user_data:
                return None
            
            columns = [desc[0] for desc in cursor.description]
            user = dict(zip(columns, user_data))
            
            # Get additional statistics for this user
            cursor.execute("""
                SELECT COUNT(*) as production_count
                FROM egg_production 
                WHERE recorded_by = %s
            """, (user_id,))
            
            stats = cursor.fetchone()
            user['production_count'] = stats[0] if stats else 0
            
            cursor.execute("""
                SELECT COUNT(*) as orders_count
                FROM orders 
                WHERE created_by = %s
            """, (user_id,))
            
            orders_stats = cursor.fetchone()
            user['orders_count'] = orders_stats[0] if orders_stats else 0
            
            return user
        except Exception as e:
            raise e

    def update_user(self, user_id, data):
        try:
            cursor = self.connection.cursor()
            
            update_fields = []
            update_values = []
            
            allowed_fields = ['first_name', 'middle_name', 'last_name', 
                            'contact_number', 'birthdate', 'role_type']
            
            for field in allowed_fields:
                if field in data:
                    update_fields.append(f"{field} = %s")
                    update_values.append(data[field])
            
            if not update_fields:
                return None
            
            update_fields.append("updated_at = NOW()")
            update_values.append(user_id)
            
            query = f"""
                UPDATE users 
                SET {', '.join(update_fields)}
                WHERE user_id = %s AND deleted_at IS NULL
                RETURNING user_id, username, first_name, last_name, role_type
            """
            
            cursor.execute(query, update_values)
            updated_user = cursor.fetchone()
            self.connection.commit()
            
            return updated_user
        except Exception as e:
            self.connection.rollback()
            raise e

    def soft_delete_user(self, user_id):
        try:
            cursor = self.connection.cursor()
            cursor.execute("""
                UPDATE users 
                SET deleted_at = NOW()
                WHERE user_id = %s AND deleted_at IS NULL
                RETURNING user_id
            """, (user_id,))
            
            result = cursor.fetchone()
            self.connection.commit()
            return result is not None
        except Exception as e:
            self.connection.rollback()
            raise e

    def find_by_username(self, username):
        try:
            cursor = self.connection.cursor()
            cursor.execute("""
                SELECT user_id, username, password, role_type, first_name, last_name, created_at
                FROM users 
                WHERE username = %s AND deleted_at IS NULL
            """, (username,))
            
            user_data = cursor.fetchone()
            if not user_data:
                return None
            
            columns = [desc[0] for desc in cursor.description]
            return dict(zip(columns, user_data))
        except Exception as e:
            raise e
    
    def verify_password(self, password, hashed_password):
        return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))