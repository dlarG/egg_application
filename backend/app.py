from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')

if __name__ == '__main__':
    app.run(debug=True, port=5000)