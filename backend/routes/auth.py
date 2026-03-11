from flask import Blueprint, request, jsonify
import jwt
import datetime
from models.user import User

auth_bp = Blueprint('auth', __name__)
JWT_SECRET = 'your-secret-key-change-this'

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
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
        }, JWT_SECRET, algorithm='HS256')
        
        return jsonify({
            'message': 'User registered successfully',
            'token': token,
            'user': {
                'id': new_user['user_id'],
                'username': new_user['username'],
                'role_type': new_user['role_type']
            }
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
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
        }, JWT_SECRET, algorithm='HS256')
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': user['user_id'],
                'username': user['username'],
                'role_type': user['role_type']
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500