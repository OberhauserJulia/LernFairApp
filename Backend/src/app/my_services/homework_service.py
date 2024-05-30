from pymongo import MongoClient
import gridfs
import io
from fastapi.responses import StreamingResponse
from bson import ObjectId
import pymongo
from fastapi import HTTPException, UploadFile

client = MongoClient()
db = client.your_database_name

def get_db(student_name: str):
    return client[student_name]

def save_tags(db, subname, document):
    collection = db[subname]
    document_id = collection.insert_one(document).inserted_id
    return document_id

async def save_file(student_name: str, file: UploadFile, documentname: str):
    file_data = await file.read()
    db = get_db(student_name)
    fs = gridfs.GridFS(db)
    file_id = fs.put(file_data, filename=file.filename, content_type=file.content_type)
    save_tags(db, "Mathe", {"Fach": "Mathe", "file_id": str(file_id), "name": file.filename, "documentname": documentname})
    return file_id

async def remove_file(file_id: str, student_name: str):
    db = get_db(student_name)
    fs = gridfs.GridFS(db)
    fs.delete(ObjectId(file_id))
    db["Mathe"].delete_one({"file_id": file_id})

def return_whole_doc(file_id: str, db):
    file_doc = db.fs.files.find_one({'_id': ObjectId(file_id)})
    if file_doc is None:
        raise HTTPException(status_code=404, detail="File not found")
    chunks = db.fs.chunks.find({'files_id': ObjectId(file_id)}).sort([("n", pymongo.ASCENDING)])
    if chunks is None:
        raise HTTPException(status_code=404, detail="File chunks not found")
    
    file_stream = io.BytesIO()
    for chunk in chunks:
        file_stream.write(chunk['data'])
    
    file_stream.seek(0)
    return StreamingResponse(file_stream, media_type=file_doc['contentType'])

async def fetch_file(file_id: str, student_name: str):
    db = get_db(student_name)
    return return_whole_doc(file_id, db)

def read_root_service():
    return {"message": "Hello World"}
