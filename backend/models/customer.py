from config.database import db

class Customer:
    def __init__(self):
        self.connection = db.connect()
    
    def get_all_customers(self):
        try:
            cursor = self.connection.cursor()
            cursor.execute("""
                SELECT customer_id, name, contact_number, created_at
                FROM customers
                ORDER BY created_at DESC
            """)
            
            columns = [desc[0] for desc in cursor.description]
            customers = []
            
            for row in cursor.fetchall():
                customer = dict(zip(columns, row))
                customers.append(customer)
            
            return customers
        except Exception as e:
            raise e
    
    def get_customer_by_id(self, customer_id):
        try:
            cursor = self.connection.cursor()
            cursor.execute("""
                SELECT c.customer_id, c.name, c.contact_number, c.created_at,
                       COUNT(DISTINCT o.order_id) as total_orders,
                       COALESCE(SUM(o.total_amount), 0) as total_spent
                FROM customers c
                LEFT JOIN orders o ON c.customer_id = o.customer_id
                WHERE c.customer_id = %s
                GROUP BY c.customer_id, c.name, c.contact_number, c.created_at
            """, (customer_id,))
            
            customer_data = cursor.fetchone()
            if not customer_data:
                return None
            
            columns = [desc[0] for desc in cursor.description]
            customer = dict(zip(columns, customer_data))
            
            # Get recent orders
            cursor.execute("""
                SELECT order_id, order_date, total_amount
                FROM orders
                WHERE customer_id = %s
                ORDER BY order_date DESC
                LIMIT 5
            """, (customer_id,))
            
            recent_orders = []
            for order_row in cursor.fetchall():
                order_columns = ['order_id', 'order_date', 'total_amount']
                order = dict(zip(order_columns, order_row))
                recent_orders.append(order)
            
            customer['recent_orders'] = recent_orders
            return customer
        except Exception as e:
            raise e