from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import os
import secrets
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key')  # Use environment variable in production!
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # Adjust based on your security needs

# Enable CORS for your React frontend
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])  # React app's URL

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

# Mock database for users (replace with your actual database)
users = {
    "1": {
        "id": "1",
        "username": "user@example.com",
        "password": generate_password_hash("password123")
    }
}

# User class for Flask-Login
class User(UserMixin):
    def __init__(self, id, username):
        self.id = id
        self.username = username

@login_manager.user_loader
def load_user(user_id):
    if user_id in users:
        user_data = users[user_id]
        return User(user_id, user_data['username'])
    return None

# Authentication routes
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Find user by username
    user_id = None
    for id, user_data in users.items():
        if user_data['username'] == username:
            user_id = id
            break
    
    if user_id and check_password_hash(users[user_id]['password'], password):
        user = User(user_id, username)
        login_user(user)
        return jsonify({"status": "success", "user": {"id": user_id, "username": username}})
    
    return jsonify({"status": "failed", "message": "Invalid username or password"}), 401

@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"status": "success"})

@app.route('/api/user', methods=['GET'])
@login_required
def get_user():
    return jsonify({
        "id": current_user.id,
        "username": current_user.username
    })

# Protected route example
@app.route('/api/protected', methods=['GET'])
@login_required
def protected():
    return jsonify({"message": "This is a protected endpoint", "user": current_user.username})

# Error handling for unauthorized access
@app.errorhandler(401)
def unauthorized(error):
    return jsonify({"status": "error", "message": "Unauthorized access"}), 401

if __name__ == '__main__':
    app.run(debug=True)


# Mock storage for password reset tokens
# In a real application, these would be stored in a database
reset_tokens = {}

# Request password reset route
@app.route('/api/request-password-reset', methods=['POST'])
def request_password_reset():
    data = request.get_json()
    email = data.get('email')
    
    # Check if user exists
    user_id = None
    for uid, user_data in users.items():
        if user_data['username'] == email:
            user_id = uid
            break
    
    if not user_id:
        # Don't reveal if user exists or not for security
        return jsonify({"status": "success", "message": "If your email is registered, you will receive a password reset link."})
    
    # Generate a token
    token = secrets.token_urlsafe(32)
    expiry = datetime.datetime.now() + datetime.timedelta(hours=1)
    
    # Store the token with user info and expiry
    reset_tokens[token] = {
        'user_id': user_id,
        'expiry': expiry
    }
    
    # In a real application, you would send an email with a link containing this token
    # For this example, we'll just return the token in the response
    # IMPORTANT: In production, NEVER return the token directly
    print(f"Reset token for {email}: {token}")
    
    return jsonify({
        "status": "success", 
        "message": "If your email is registered, you will receive a password reset link.",
        "debug_token": token  # REMOVE THIS IN PRODUCTION
    })

# Reset password route
@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    token = data.get('token')
    password = data.get('password')
    
    # Check if token exists and is valid
    if token not in reset_tokens:
        return jsonify({"status": "failed", "message": "Invalid or expired reset token"}), 400
    
    token_data = reset_tokens[token]
    
    # Check if token is expired
    if datetime.datetime.now() > token_data['expiry']:
        del reset_tokens[token]
        return jsonify({"status": "failed", "message": "Reset token has expired"}), 400
    
    # Update the user's password
    user_id = token_data['user_id']
    users[user_id]['password'] = generate_password_hash(password)
    
    # Remove the used token
    del reset_tokens[token]
    
    return jsonify({"status": "success", "message": "Password has been reset successfully"})

# Registration route
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Check if username already exists
    for user_id, user_data in users.items():
        if user_data['username'] == username:
            return jsonify({"status": "failed", "message": "Username already exists"}), 400
    
    # Generate a new user ID (in a real app, this would be handled by your database)
    new_user_id = str(len(users) + 1)
    
    # Add the new user to our mock database
    users[new_user_id] = {
        "id": new_user_id,
        "username": username,
        "password": generate_password_hash(password)
    }
    
    # Create and login the new user
    user = User(new_user_id, username)
    login_user(user)
    
    return jsonify({"status": "success", "user": {"id": new_user_id, "username": username}})