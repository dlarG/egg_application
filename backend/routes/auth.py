from flask import Blueprint, request, jsonify
import jwt
import datetime
import os
from dotenv import load_dotenv
from models.user import User

# Load environment variables
load_dotenv()

auth_bp = Blueprint('auth', __name__)

# Get JWT secret from environment variables
JWT_SECRET = os.getenv('JWT_SECRET')
JWT_EXPIRY_DAYS = int(os.getenv('JWT_EXPIRY_DAYS', 7))

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not all([username, password]):
            return jsonify({'error': 'All fields are required'}), 400
        
        user_model = User()
        
        # Check if user already exists
        existing_user = user_model.find_by_username(username)
        if existing_user:
            return jsonify({'error': 'Username already registered'}), 409
        
        # Create new user
        new_user = user_model.create_user(username, password)
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': new_user['user_id'],
            'username': new_user['username'],
            'role_type': new_user['role_type'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=JWT_EXPIRY_DAYS)
        }, JWT_SECRET, algorithm='HS256')
        
        # Determine redirect path based on role
        role = new_user['role_type']
        redirect_path = f"/{role}-dashboard" if role in ['guest', 'staff', 'admin'] else '/staff-dashboard'
        
        return jsonify({
            'message': 'User registered successfully',
            'token': token,
            'user': {
                'id': new_user['user_id'],
                'username': new_user['username'],
                'role_type': new_user['role_type']
            },
            'redirect_path': redirect_path
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not all([username, password]):
            return jsonify({'error': 'Username and password are required'}), 400

        user_model = User()
        user = user_model.find_by_username(username)

        if not user or not user_model.verify_password(password, user['password']):
            return jsonify({'error': 'Invalid username or password'}), 401

        # Generate JWT token
        token = jwt.encode({
            'user_id': user['user_id'],
            'username': user['username'],
            'role_type': user['role_type'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=JWT_EXPIRY_DAYS)
        }, JWT_SECRET, algorithm='HS256')
        
        # Determine redirect path based on role
        role = user['role_type']
        redirect_path = f"/{role}-dashboard" if role in ['guest', 'staff', 'admin'] else '/staff-dashboard'
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': user['user_id'],
                'username': user['username'],
                'role_type': user['role_type']
            },
            'redirect_path': redirect_path
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Optional: Add a route to verify token
@auth_bp.route('/verify', methods=['GET'])
def verify_token():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'No token provided'}), 401
        
        # Remove 'Bearer ' prefix if present
        if token.startswith('Bearer '):
            token = token[7:]
        
        # Verify token
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        
        return jsonify({
            'valid': True,
            'user': {
                'id': payload['user_id'],
                'username': payload['username'],
                'role_type': payload['role_type']
            }
        }), 200
        
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500