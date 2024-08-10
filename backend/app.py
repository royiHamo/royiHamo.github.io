from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect

app = Flask(__name__)
CORS(app)

# Database setup
DATABASE_URI = r'sqlite:///C:\Users\royih\PycharmProjects\Bototel-Server\instance\bototel.db'
engine = create_engine(DATABASE_URI)

# Reflect the existing database schema
Base = automap_base()
Base.prepare(autoload_with=engine)

# Print out the table names to ensure correct reflection
inspector = inspect(engine)
print(inspector.get_table_names())

print("------------------")
# Check the available classes to ensure we are mapping correctly
for cls in Base.classes:
    print(cls)

# Mapped classes are now created with names by default matching that of the table names.
User = Base.classes.user
Comment = Base.classes.comment

@app.route('/api/users', methods=['GET'])
def get_users():
    session = Session(engine)
    users = session.query(User).all()
    user_list = [
        {
            'id': user.id,
            'phone_number': user.phone_number,
            'name': user.name,
            'state': user.state,
            'data': user.data,
        } for user in users
    ]
    return jsonify(user_list)

@app.route('/api/add_comment' , methods=['POST'])
def add_comment(user_id, rating, text):
    session = Session(engine)
    # should add a row for comment to a new table named comments
    comment = Comment()
    comment.user_id = user_id
    comment.rating = rating
    comment.text = text
    session.add(comment)
        
    session.commit()
    return jsonify({'message': 'success'})

@app.route('/api/comments', methods=['GET'])
def get_comments():
    session = Session(engine)
    users = session.query(User).all()
    user_list = [
        {
            'id': user.id,
            'phone_number': user.phone_number,
            'name': user.name,
            'state': user.state,
            'data': user.data,
        } for user in users
    ]
    return jsonify(user_list)


if __name__ == '__main__':
    app.run(debug=True)
