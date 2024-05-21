import base64
from PIL import Image
import io
from bson.objectid import ObjectId

from pymongo import MongoClient

def search_by_id(id):
    # Erstellen Sie eine Verbindung zum MongoDB-Server
    client = MongoClient('localhost', 27017)

    # Zugriff auf die Datenbank 'student_database'
    db = client['homework_database']

    # Zugriff auf die Sammlung 'john_doe'
    collection = db['John']

    # Suche nach der ID
    result = collection.find_one({'_id': ObjectId(id)})

    return result

# Bild in Base64 codieren
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')


def decode_image(base64_string):
    image_data = base64.b64decode(base64_string)
    image = Image.open(io.BytesIO(image_data))
    image.show()
    return image

data = search_by_id("664c9763eb4cd881ea859066")
image = decode_image(data['file'])

