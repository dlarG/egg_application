from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
from routes.auth import auth_bp

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS for production
if os.getenv('FLASK_ENV') == 'production':
    # In production, you might want to restrict origins
    CORS(app, origins=['https://yourdomain.com', 'http://localhost:5173/login'])  # Replace with your frontend URL
else:
    # In development, allow all origins
    CORS(app)

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