from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
import os
import secrets
import datetime

app = Flask(__name__)

# Amazon RDS PostgreSQL Connection Details
DB_USER = "postgres"
DB_PASSWORD = "BeachHouse"
DB_HOST = "express-auto.c6bogymw63tm.us-east-1.rds.amazonaws.com"
DB_PORT = "5324"
DB_NAME = "postgres"

# Construct the PostgreSQL connection URI
app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Security Configurations
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key')  # Use environment variable in production!
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

# Enable CORS for React frontend
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

# User model for PostgreSQL
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Database connection test route
@app.route('/api/db-test', methods=['GET'])
def test_db():
    try:
        with db.engine.connect() as connection:
            result = connection.execute("SELECT NOW();").fetchone()
            return jsonify({"status": "success", "message": f"Connected to PostgreSQL at {result[0]}"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
    


# Authentication routes
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first()

    if user and check_password_hash(user.password, data.get('password')):
        login_user(user)
        return jsonify({"status": "success", "user": {"id": user.id, "username": user.username}})

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


@app.route('/api/add-user', methods=['POST'])
def add_user():
    data = request.get_json()
    if not data or not data.get("username") or not data.get("password"):
        return jsonify({"status": "failed", "message": "Username and password required"}), 400

    hashed_password = generate_password_hash(data["password"])
    new_user = User(username=data["username"], password=hashed_password)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"status": "success", "message": f"User {new_user.username} added!"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"status\": \"error\", \"message\": str(e)"}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
