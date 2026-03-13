from flask import Blueprint, request, jsonify
import jwt
import os
from functools import wraps
from models.user import User

user_management_bp = Blueprint('user_management', __name__)

# JWT token verification decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            if token.startswith('Bearer '):
                token = token[7:]
            
            payload = jwt.decode(token, os.getenv('JWT_SECRET'), algorithms=['HS256'])
            current_user = payload
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Token is invalid'}), 401
        
        return f(current_user, *args, **kwargs)
    return decorated

@user_management_bp.route('/users', methods=['GET'])
@token_required
def get_users(current_user):
    try:
        # Only admins can view all users
        if current_user['role_type'] != 'admin':
            return jsonify({'error': 'Insufficient privileges'}), 403
        
        user_model = User()
        users = user_model.get_all_users()
        
        return jsonify({
            'users': users,
            'total': len(users)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@user_management_bp.route('/users/<int:user_id>', methods=['GET'])
@token_required
def get_user_details(current_user, user_id):
    try:
        if current_user['role_type'] != 'admin':
            return jsonify({'error': 'Insufficient privileges'}), 403
        
        user_model = User()
        user_details = user_model.get_user_by_id(user_id)
        
        if not user_details:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify(user_details), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500