from config.database import db

class Customers:
    def __init__(self):
        self.connection = db.connect()
    
    def get_all_customers(self):
        try:
            cursor = self.connection.cursor()
            cursor.execute("""
                SELECT customer_id, name, contact_number, created_at
                FROM customers
                ORDER BY name
            """)
            return cursor.fetchall()
        except Exception as e:
            raise e
    
    def create_customer(self, name, contact_number=None):
        try:
            cursor = self.connection.cursor()
            cursor.execute("""
                INSERT INTO customers (name, contact_number, created_at)
                VALUES (%s, %s, NOW())
                RETURNING customer_id, name, contact_number, created_at
            """, (name, contact_number))
            
            customer = cursor.fetchone()
            self.connection.commit()
            return customer
        except Exception as e:
            self.connection.rollback()
            raise e