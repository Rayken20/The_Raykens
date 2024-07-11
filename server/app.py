import os
import sys
from functools import wraps

from dotenv import load_dotenv
from flask import Flask, request, make_response, redirect, url_for, abort, jsonify
from sqlalchemy.exc import IntegrityError
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import login_required
from flask_bcrypt import Bcrypt
from config import cloudconfig
cloudconfig
import cloudinary
import cloudinary.uploader
from models import db, CorruptionReport, CorruptionResolution, User, PublicPetition, PetitionResolution, PasswordResetToken
from utils import DATABASE_URI
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from flasgger import Swagger
import random
import string
import jwt
import base64
# Load environment variables
load_dotenv()

# Append the parent directory to the sys.path to ensure imports work correctly
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Initiate Flask app
app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'default_secret_key')
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.config['SWAGGER'] = {
    'title': 'Auth and Cloudinary API docs',
    'uiversion': 3
}
swagger = Swagger(app)
CORS(app)

# Initiate third-party services
db.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)



# api = Api(app)
# swagger = Swagger(api, title='Auth and Authorization', description='My Flask API Documentation for Auth using JWT and cloudinary upload.')
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# get postgresql external string from render.
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://authorizationapis_tidn_user:2ojSPuvRhLLJvWhK78HLxVQITPqGhZWE@dpg-coegmp0l5elc73883lk0-a.oregon-postgres.render.com/authorizationapis_tidn'
# postgresql format 
# postgresql://username:password@hostname/database_name


# cloudinary 
# Configure Cloudinary
# raw credentials are too exposed. 
# generating jwt secret key 
secret_key = base64.b64encode(os.urandom(24)).decode('utf-8')
print(secret_key)


# Bind the SQLAlchemy instance to the Flask app
# silence the initialization below for postgresql use it for sqlite. 
# db.init_app(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

@app.route('/register', methods=['POST'])
def register():
    """
    Register a new user.
    ---
    tags:
      - Authentication
    parameters:
      - name: fullname
        in: body
        type: string
        required: true
        description: User's full name
      - name: email
        in: body
        type: string
        required: true
        description: User's email
      - name: password
        in: body
        type: string
        required: true
        description: User's password
      - name: id_passport_no
        in: body
        type: integer
        required: true
        description: User's Passport number
      - name: role
        in: body
        type: string
        required: true
        description: User's role
    responses:
      201:
        description: User registered successfully
        schema:
          type: object
          properties:
            message:
              type: string
              description: Registration success message
      400:
        description: Bad request, invalid input data
    """
    data = request.get_json()

    # Debug: Print the received data
    # print("Received data:", data)
    
    fullname = data.get('fullname')
    email = data.get('email')
    password = data.get('password')
    id_passport_no = data.get('id_passport_no')
    role = data.get('role')

    # Ensure all fields are provided
    if not fullname or not email or not password or not id_passport_no or not role:
        return jsonify({'error': 'Missing one of the required fields'}), 400

    # Check if email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email is already in use'}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(fullname=fullname, email=email, password=hashed_password, id_passport_no=id_passport_no, role=role)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        # Set the expiration time to 1 hour from now
        expiration_time = datetime.utcnow() + timedelta(hours=1)
        # Generate the JWT token with the 'exp' claim
        token = jwt.encode({'user_id': user.id, 'exp': expiration_time}, secret_key, algorithm='HS256')
        print(token)
        return jsonify({'message': 'Login successful', 'token': token})
    else:
        return jsonify({'message': 'Invalid email or password'}), 401
    
# Helper function to decode the token
def decode_token(token):
    try:
        payload = jwt.decode(token, secret_key, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return 'Token has expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'


# Protected route example
@app.route('/protected', methods=['GET'])
def protected_route():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'message': 'Token is missing'}), 401

    token = token.split(' ')[1]  # Extract the token from the 'Authorization' header

    # Decode the token
    payload = decode_token(token)

    if isinstance(payload, str):
        return jsonify({'message': payload}), 401

    user_id = payload.get('user_id')
    
    # Now you have the user ID, and you can perform further authorization logic
    # Check if the user has the necessary permissions, etc.
    # the process 
    return jsonify({'message': 'Access granted'}), 200



@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    user = User.query.filter_by(email=email).first()

    if user:
        # Generate a random token
        token = ''.join(random.choices(string.ascii_letters + string.digits, k=20))

        # Set token expiration time (e.g., 1 hour)
        expiration = datetime.now() + timedelta(hours=1)

        # Create a new reset token
        reset_token = PasswordResetToken(user_id=user.id, token=token, expiration=expiration)
        db.session.add(reset_token)
        db.session.commit()

        # In a real application, you would send an email with the reset link containing the token

        return jsonify({'message': 'Password reset token generated successfully'})

    return jsonify({'message': 'User not found'}), 404

@app.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    data = request.get_json()
    new_password = data.get('new_password')

    reset_token = PasswordResetToken.query.filter_by(token=token).first()

    if reset_token and reset_token.expiration > datetime.now():
        user = User.query.filter_by(id=reset_token.user_id).first()
        hashed_password = generate_password_hash(new_password, method='sha256')
        user.password = hashed_password

        db.session.delete(reset_token)
        db.session.commit()

        return jsonify({'message': 'Password reset successful'})

    return jsonify({'message': 'Invalid or expired reset token'}), 400


@app.route('/upload-profile-picture/<int:user_id>', methods=['POST'])
def upload_profile_picture(user_id):
    # Check if the 'file' key exists in the request.files
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    file = request.files['file']

    # Check if a file was uploaded
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    # Upload the image to Cloudinary
    try:
        result = cloudinary.uploader.upload(file)
        image_url = result['secure_url']

        # Retrieve the user
        user = User.query.get(user_id)

        # Update the user's profile picture URL
        user.profile_picture = image_url

        db.session.commit()

        return jsonify({'message': 'Profile picture uploaded and updated successfully', 'url': image_url}), 200
    except Exception as e:
        return jsonify({'message': f'Error uploading image: {str(e)}'}), 500



## CorruptionReports Routes
@app.route('/corruption_reports', methods=['POST'])
# @login_required
def create_corruption_report():
    data = request.json
    # Check if a similar report already exists
    existing_report = CorruptionReport.query.filter_by(
        govt_agency=data['govt_agency'],
        county=data['county'],
        title=data['title'],
        description=data['description'],
        user_id=data['user_id']
    ).first()

    if existing_report:
        return jsonify({'error': 'Corruption report already exists'}), 409

    # Create a new report
    new_report = CorruptionReport(
        govt_agency=data['govt_agency'],
        county=data['county'],
        longitude=data.get('longitude'),
        latitude=data.get('latitude'),
        title=data['title'],
        description=data['description'],
        media=data.get('media'),
        status=data.get('status', 'Pending'),
        user_id=data['user_id']
    )

    db.session.add(new_report)
    try:
        db.session.commit()
        return jsonify({'message': 'Corruption report created successfully', 'report_id': new_report.id}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Failed to create corruption report due to database integrity error'}), 500

@app.route('/corruption_reports', methods=['GET'])
@login_required
def get_all_corruption_reports():
    reports = CorruptionReport.query.all()
    return jsonify([{
        'id': report.id,
        'govt_agency': report.govt_agency,
        'county': report.county,
        'longitude': report.longitude,
        'latitude': report.latitude,
        'title': report.title,
        'description': report.description,
        'media': report.media,
        'status': report.status,
        'user_id': report.user_id
    } for report in reports]), 200

@app.route('/corruption_reports/<int:report_id>', methods=['GET'])
@login_required
def get_corruption_report(report_id):
    report = CorruptionReport.query.get(report_id)
    if report:
        return jsonify({
            'id': report.id,
            'govt_agency': report.govt_agency,
            'county': report.county,
            'longitude': report.longitude,
            'latitude': report.latitude,
            'title': report.title,
            'description': report.description,
            'media': report.media,
            'status': report.status,
            'user_id': report.user_id
        }), 200
    return jsonify({'error': 'Corruption report not found'}), 404

@app.route('/corruption_reports/<int:report_id>', methods=['PUT', 'PATCH'])
@login_required
def update_corruption_report(report_id):
    report = CorruptionReport.query.get(report_id)
    if report:
        data = request.json
        report.govt_agency = data.get('govt_agency', report.govt_agency)
        report.county = data.get('county', report.county)
        report.longitude = data.get('longitude', report.longitude)
        report.latitude = data.get('latitude', report.latitude)
        report.title = data.get('title', report.title)
        report.description = data.get('description', report.description)
        report.media = data.get('media', report.media)
        report.status = data.get('status', report.status)
        db.session.commit()
        return jsonify({'message': 'Corruption report updated successfully'}), 200
    return jsonify({'error': 'Corruption report not found'}), 404

@app.route('/corruption_reports/<int:report_id>', methods=['DELETE'])
@login_required
def delete_corruption_report(report_id):
    report = CorruptionReport.query.get(report_id)
    if report:
        db.session.delete(report)
        db.session.commit()
        return jsonify({'message': 'Corruption report deleted successfully'}), 200
    return jsonify({'error': 'Corruption report not found'}), 404



## CorruptionResolution Routes
@app.route('/corruption_resolutions', methods=['POST'])
@login_required
def create_corruption_resolution():
    data = request.json
    existing_resolution = CorruptionResolution.query.filter_by(
        status=data['status'],
        justification=data['justification'],
        additional_comments=data.get('additional_comments'),
        record_id=data['record_id']
    ).first()

    if existing_resolution:
        return jsonify({'error': 'Corruption resolution already exists'}), 409

    new_resolution = CorruptionResolution(
        status=data['status'],
        justification=data['justification'],
        additional_comments=data.get('additional_comments'),
        record_id=data['record_id']
    )

    db.session.add(new_resolution)
    try:
        db.session.commit()
        return jsonify({'message': 'Corruption resolution created successfully', 'resolution_id': new_resolution.id}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Failed to create corruption resolution due to database integrity error'}), 500


@app.route('/corruption_resolutions', methods=['GET'])
@login_required
def get_all_corruption_resolutions():
    resolutions = CorruptionResolution.query.all()
    return jsonify([{
        'id': resolution.id,
        'status': resolution.status,
        'justification': resolution.justification,
        'additional_comments': resolution.additional_comments,
        'record_id': resolution.record_id
    } for resolution in resolutions]), 200

@app.route('/corruption_resolutions/<int:resolution_id>', methods=['GET'])
@login_required
def get_corruption_resolution(resolution_id):
    resolution = CorruptionResolution.query.get(resolution_id)
    if resolution:
        return jsonify({
            'id': resolution.id,
            'status': resolution.status,
            'justification': resolution.justification,
            'additional_comments': resolution.additional_comments,
            'record_id': resolution.record_id
        })
    return jsonify({'error': 'Corruption resolution not found'}), 404


@app.route('/corruption_resolutions/<int:resolution_id>', methods=['PUT', 'PATCH'])
@login_required
def update_corruption_resolution(resolution_id):
    resolution = CorruptionResolution.query.get(resolution_id)
    if resolution:
        data = request.json
        resolution.status = data.get('status', resolution.status)
        resolution.justification = data.get('justification', resolution.justification)
        resolution.additional_comments = data.get('additional_comments', resolution.additional_comments)
        db.session.commit()
        return jsonify({'message': 'Corruption resolution updated successfully'})
    return jsonify({'error': 'Corruption resolution not found'}), 404

@app.route('/corruption_resolutions/<int:resolution_id>', methods=['DELETE'])
@login_required
def delete_corruption_resolution(resolution_id):
    resolution = CorruptionResolution.query.get(resolution_id)
    if resolution:
        db.session.delete(resolution)
        db.session.commit()
        return jsonify({'message': 'Corruption resolution deleted successfully'})
    return jsonify({'error': 'Corruption resolution not found'}), 404


@app.route('/upload_report', methods=['POST'])
@login_required
def upload_file():
    if 'file' not in request.files:
        return jsonify ({'error': 'No file part'}), 400
    
    file= request.files['file']
    if file.filename=='':
        return jsonify ({'error': 'No selected file'}), 400
    
    try:
        #upload the file to cloudinary
        result= cloudinary.uploader.upload(file)        
        return jsonify ({'url': result['secure_url']})
    except Exception as e:
        return jsonify ({'error': str(e)})


## PUblic Petitions Routes
@app.route('/public_petitions', methods=['GET', 'POST'])
def public_petitions():
    
    if request.method == 'GET':
        public_petitions = []
        for public_petition in PublicPetition.query.all():
            public_petitions.append(public_petition.to_dict())
        return make_response(public_petitions, 200)
    
    elif request.method == 'POST':
        existing_petition = PublicPetition.query.filter_by(
            govt_agency=request.json.get("govt_agency"),
            county=request.json.get("county"),
            title=request.json.get("title"),
            description=request.json.get("description"),
            media=request.json.get("media"),
            status=request.json.get("status"),
            latitude=request.json.get("latitude"),
            longitude=request.json.get("longitude"),
            user_id=request.json.get("user_id")
        ).first()

        if existing_petition:
            return make_response(
                {"error": "This Intervention Record already exists."}, 409
            )
        new_public_petition = PublicPetition(
            govt_agency=request.json.get("govt_agency"),
            county=request.json.get("county"),
            title=request.json.get("title"),
            description=request.json.get("description"),
            media=request.json.get("media"),
            status=request.json.get("status"),
            latitude=request.json.get("latitude"),
            longitude=request.json.get("longitude"),
            user_id=request.json.get("user_id")
        )
        db.session.add(new_public_petition) 

        try:
            db.session.commit()
            response = {"message": "Successfully created"}
            return make_response(response, 201)
        except IntegrityError:
            return {"error": "This error occured due to database integrity issues."}
    
    
@app.route('/petition_resolutions', methods=['GET', 'POST'])
@login_required
def petition_resolutions():
    
    if request.method == 'GET':
        petition_resolutions = []
        for petition_resolution in PetitionResolution.query.all():
            petition_resolutions.append(petition_resolution.to_dict())
        return make_response(petition_resolutions, 200)
    
    elif request.method == 'POST':
        existing_resolution = PetitionResolution.query.filter_by(
            status=request.json.get("status"),
            justification=request.json.get("justification"),
            additional_comments=request.json.get("additional_comments"),
            record_id=request.json.get("record_id")
        ).first()

        if existing_resolution:
            return make_response({"error": "This resolution already exists"}, 409)
        
        new_pr = PetitionResolution(
            status=request.json.get("status"),
            justification=request.json.get("justification"),
            additional_comments=request.json.get("additional_comments"),
            record_id=request.json.get("record_id")
        )
        db.session.add(new_pr)
        try:
            db.session.commit()
            return make_response({
                "message": "Successfully created"
            }, 201)
        except IntegrityError:
            return {"error": "This error occured due to database integrity issues."}
    
@app.route('/public_petitions/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
@login_required
def public_petition(id):
    public_petition = PublicPetition.query.filter(PublicPetition.id==id).first()

    if public_petition == None:
        return {"error": "Intervention report not found"}, 404
    
    else:
        if request.method == 'GET':
            response = make_response(public_petition.to_dict(), 200)
            return response
        
        elif request.method == 'PATCH':
            for attr in request.json:
                setattr(public_petition, attr, request.json.get(attr))
            
            db.session.add(public_petition)
            try:
                db.session.commit()
                return make_response(
                    {"message": "Intervention successfully updated"}, 200
                )
            except IntegrityError:
                return {"error": "This error occured due to database integrity issues"}
        
        elif request.method == "DELETE":
            db.session.delete(public_petition)
            db.session.commit()

            return make_response({"message": "Intervention successfully deleted"}, 200)
        
@app.route('/petition_resolutions/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
@login_required
def petition_resolution(id):
    pr = PetitionResolution.query.filter(PetitionResolution.id==id).first()
    if pr == None:
        return {"error": "Resolution record not found"}, 404
    
    else:
        if request.method == 'GET':
            response = make_response(pr.to_dict(), 200)
            return response
        
        elif request.method == 'PATCH':
            for attr in request.json:
                setattr(pr, attr, request.json.get(attr))
            
            db.session.add(pr)
            try:
                db.session.commit()
                return make_response({
                    "message": "Resolution successfully updated"
                }, 200)
            except IntegrityError:
                return {"error": "This error occured due to database integrity issues."}
        
        elif request.method == 'DELETE':
            db.session.delete(pr)
            db.session.commit()

            return make_response({
                "message": "Resolution successfully deleted"
            })
        


@app.route('/upload_resolution', methods=['POST'])
@login_required
def upload_resolution_file():    
    if 'file' not in request.files:
        return jsonify({"error": "Oops!! There is no file."}), 400
    

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        #Upload file to cloudinary
        result =cloudinary.uploader.upload(file)
        return jsonify({'url': result['secure_url']})
    except Exception as e:
        return jsonify({'error':str(e)})



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5000, debug=True)