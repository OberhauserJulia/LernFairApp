from flask import Flask, request, jsonify
from bson import Binary
from app import db  # Importieren Sie die Datenbankverbindung aus app.py

class Student:
    def __init__(self, name, class_name, file_data=None):
        self.name = name
        self.class_name = class_name
        self.file_data = file_data.encode() if file_data else None  # Konvertieren Sie die Zeichenfolge in bytes, wenn sie vorhanden ist

    def save_to_database(self):
        collection = db[self.name]  # Greifen Sie auf die Sammlung zu
        student_data = {
            'name': self.name,
            'class' : self.class_name
        }

        if self.file_data:
            student_data['file'] = Binary(self.file_data)

        result = collection.insert_one(student_data)
        return result.inserted_id
