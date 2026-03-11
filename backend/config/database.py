import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Database:
    def __init__(self):
        self.connection = None
    
    def connect(self):
        try:
            # Connection parameters
            connection_params = {
                'host': os.getenv('DB_HOST', 'localhost'),
                'database': os.getenv('DB_NAME', 'postgres'),
                'user': os.getenv('DB_USER', 'postgres'),
                'password': os.getenv('DB_PASSWORD'),
                'port': int(os.getenv('DB_PORT', 5432)),
                'cursor_factory': RealDictCursor
            }
            
            # Add SSL for cloud databases
            if 'supabase.com' in connection_params['host']:
                connection_params['sslmode'] = 'require'
            
            self.connection = psycopg2.connect(**connection_params)
            
            print(f"✅ Connected to database: {connection_params['host']}")
            return self.connection
            
        except Exception as e:
            print(f"❌ Error connecting to database: {e}")
            return None
    
    def disconnect(self):
        if self.connection:
            self.connection.close()

db = Database()