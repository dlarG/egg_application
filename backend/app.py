from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
from routes.auth import auth_bp

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS - Allow both development and production origins
allowed_origins = [
    'http://localhost:3000',    # React default
    'http://localhost:5173',    # Vite default
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    'https://yourdomain.com'    # Replace with your actual production domain
]

CORS(app, 
     origins=allowed_origins,
     methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allow_headers=['Content-Type', 'Authorization'],
     supports_credentials=True)

# Configure Flask from environment variables
app.config['ENV'] = os.getenv('FLASK_ENV', 'development')
app.config['DEBUG'] = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')

@app.route('/', methods=['GET'])
def home():
    return {'message': 'Egg Application API', 'status': 'running'}

@app.route('/api/health', methods=['GET'])
def health_check():
    return {
        'status': 'healthy', 
        'message': 'Egg Application API is running',
        'environment': app.config['ENV']
    }

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=app.config['DEBUG'])