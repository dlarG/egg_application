from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
from routes.auth import auth_bp

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Flask from environment variables
app.config['ENV'] = os.getenv('FLASK_ENV', 'development')
app.config['DEBUG'] = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')

@app.route('/api/health', methods=['GET'])
def health_check():
    return {'status': 'healthy', 'message': 'Egg Application API is running'}

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = app.config['DEBUG']
    app.run(debug=debug, port=port, host='0.0.0.0')