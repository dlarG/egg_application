from config.database import db

class EggTypes:
    def __init__(self):
        self.connection = db.connect()
    
    def get_all_egg_types(self):
        try:
            cursor = self.connection.cursor()
            cursor.execute("""
                SELECT egg_type_id, size, piece_price, half_tray_price, tray_price
                FROM egg_types
                ORDER BY egg_type_id
            """)
            return cursor.fetchall()
        except Exception as e:
            raise e
    
    def create_egg_type(self, size, piece_price, half_tray_price, tray_price):
        try:
            cursor = self.connection.cursor()
            cursor.execute("""
                INSERT INTO egg_types (size, piece_price, half_tray_price, tray_price)
                VALUES (%s, %s, %s, %s)
                RETURNING egg_type_id, size, piece_price, half_tray_price, tray_price
            """, (size, piece_price, half_tray_price, tray_price))
            
            egg_type = cursor.fetchone()
            self.connection.commit()
            return egg_type
        except Exception as e:
            self.connection.rollback()
            raise e