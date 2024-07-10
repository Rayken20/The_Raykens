from app import app  # Import the app and db from app.py
from models import db, User, PasswordResetToken, CorruptionReport, CorruptionResolution, PublicPetition, PetitionResolution
from werkzeug.security import generate_password_hash

def seed_data():
    with app.app_context():
        # Create the database and tables
        db.create_all()

        # Create users
        user1 = User(
            fullname='John Doe',
            email='john@example.com',
            password=generate_password_hash('password1'),
            id_passport_no=123456789,
            role='user'
        )
        
        user2 = User(
            fullname='Jane Smith',
            email='jane@example.com',
            password=generate_password_hash('password2'),
            id_passport_no=987654321,
            role='admin'
        )

        db.session.add_all([user1, user2])
        db.session.commit()

        # Create corruption reports
        report1 = CorruptionReport(
            govt_agency='Agency A',
            county='County X',
            title='Corruption Report 1',
            description='Description of corruption report 1',
            user_id=user1.id
        )
        
        report2 = CorruptionReport(
            govt_agency='Agency B',
            county='County Y',
            title='Corruption Report 2',
            description='Description of corruption report 2',
            user_id=user2.id
        )

        db.session.add_all([report1, report2])
        db.session.commit()

        # Create public petitions
        petition1 = PublicPetition(
            govt_agency='Agency C',
            county='County Z',
            title='Public Petition 1',
            description='Description of public petition 1',
            user_id=user1.id
        )
        
        petition2 = PublicPetition(
            govt_agency='Agency D',
            county='County W',
            title='Public Petition 2',
            description='Description of public petition 2',
            user_id=user2.id
        )

        db.session.add_all([petition1, petition2])
        db.session.commit()

        # Create corruption resolutions
        resolution1 = CorruptionResolution(
            status='Resolved',
            justification='Justification for resolution 1',
            record_id=report1.id
        )
        
        resolution2 = CorruptionResolution(
            status='Pending',
            justification='Justification for resolution 2',
            record_id=report2.id
        )

        db.session.add_all([resolution1, resolution2])
        db.session.commit()

        # Create petition resolutions
        petition_resolution1 = PetitionResolution(
            status='Approved',
            justification='Justification for petition resolution 1',
            record_id=petition1.id
        )
        
        petition_resolution2 = PetitionResolution(
            status='Denied',
            justification='Justification for petition resolution 2',
            record_id=petition2.id
        )

        db.session.add_all([petition_resolution1, petition_resolution2])
        db.session.commit()

        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_data()
