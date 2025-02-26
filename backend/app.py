from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key')  # Use environment variable in production!
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # Adjust based on your security needs

# Enable CORS for your React frontend
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])  # Update with your React app's URL

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