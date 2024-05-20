from flask import Flask
import pymongo
import os 

app = Flask(__name__)

# Verbindung zur MongoDB herstellen
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['homework_database']
collection = db['student_collection']

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Importieren Sie den Blueprint
from routes.routes import routes

# Registrieren Sie den Blueprint
app.register_blueprint(routes)

if __name__ == '__main__':
    app.run(debug=True)
