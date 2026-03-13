from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
from routes.auth import auth_bp
from routes.user_management import user_management_bp  # Add this import

# Load environment variables
load_dotenv()

app = Flask(__name__)

FRONTEND_URL = os.getenv('FRONTEND_URL', 'https://tejero-egg-application.netlify.app')

# Configure CORS - More permissive for debugging
if os.getenv('FLASK_ENV') == 'development':
    CORS(app, origins=[
        FRONTEND_URL,
        'http://localhost:5173',  # For local development
        'http://192.168.3.32:5173/',  # For local network access
        'https://tejero-egg-application.netlify.app'  # Your Netlify URL
    ], supports_credentials=True)
else:
    CORS(app)

# Configure Flask from environment variables
app.config['ENV'] = os.getenv('FLASK_ENV', 'development')
app.config['DEBUG'] = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(user_management_bp, url_prefix='/api/user-management')  # Add this line

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