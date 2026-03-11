import psycopg
from psycopg.rows import dict_row
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Database:
    def __init__(self):
        self.connection = None
    
    def connect(self):
        try:
            # Build connection string
            connection_string = (
                f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
                f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
            )
            
            # Add SSL for cloud databases
            if 'supabase.com' in os.getenv('DB_HOST', ''):
                connection_string += "?sslmode=require"
            
            self.connection = psycopg.connect(
                connection_string,
                row_factory=dict_row
            )
            
            print(f"✅ Connected to database: {os.getenv('DB_HOST')}")
            return self.connection
            
        except Exception as e:
            print(f"❌ Error connecting to database: {e}")
            return None
    
    def disconnect(self):
        if self.connection:
            self.connection.close()

db = Database()