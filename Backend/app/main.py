from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.responses import JSONResponse
from pymongo import MongoClient
import gridfs
import io
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import pymongo
from bson import ObjectId


app = FastAPI()

# Erlaube CORS für alle Ursprünge (*)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a connection to the MongoDB server and select the database
client = MongoClient()
db = client.your_database_name
# Create a GridFS instance using the selected database
fs = gridfs.GridFS(db)


@app.get("/")
def read_root():
    return JSONResponse(content={"message": "Hello World"}, status_code=200)



@app.post("/uploadfile/{student_name}")
async def upload_file(student_name: str, file: UploadFile = File(...), documentname: str = Form(...), subjectname : str = Form(...)):
    try:
        # Lies den Dateiinhalt
        file_data = await file.read()
        
        # Wähle die Datenbank basierend auf dem Namen des Schülers
        db = client[student_name]
        fs = gridfs.GridFS(db)
        # Speichere die Datei in GridFS
        file_id = fs.put(file_data, filename=file.filename, content_type=file.content_type)

        safe_tags(db, subjectname, {"Fach" : subjectname , "file_id" : str(file_id), "name" : file.filename, "documentname" : documentname})

        return JSONResponse(content={"file_id": str(file_id)}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)



#Speichert File in eine Übersicht geordnet nach Fach
def safe_tags(db : object ,subname, document): 
    collection = db[subname] 
    document_id = collection.insert_one(document).inserted_id
    return document_id
    

    
@app.delete("/deletefile/{file_id}/{student_name}")
async def delete_file(file_id: str, student_name: str):
    try:
        # Wähle die Datenbank basierend auf dem Namen des Schülers
        db = client[student_name]
        fs = gridfs.GridFS(db)
        
        # Lösche die Datei aus GridFS
        fs.delete(ObjectId(file_id))
        
        # Lösche das Dokument aus der Sammlung
        db["Mathe"].delete_one({"file_id": file_id})

        return JSONResponse(content={"message": "File deleted successfully"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)



@app.get("/getfile/{file_id}/{student_name}")
async def get_file(file_id: str, student_name: str):
    try:
        db = client[student_name]
        # Suche nach der Datei in GridFS anhand der Datei-ID in der fs.files-Sammlung
        file = return_whole_doc(file_id, db)
        return file 
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


#returtns the file as a strrming response
def return_whole_doc(file_id:str, db:object): 
    file_doc = db.fs.files.find_one({ '_id': ObjectId(file_id) })
    if file_doc is None:
        raise HTTPException(status_code=404, detail="File not found")
    chunks = db.fs.chunks.find({ 'files_id': ObjectId(file_id) }).sort([("n", pymongo.ASCENDING)])
    if chunks is None:
        raise HTTPException(status_code=404, detail="File chunks not found")
    
    # Erstelle einen BytesIO-Stream, um die Datei zurückzugeben
    file_stream = io.BytesIO()
    for chunk in chunks:
        file_stream.write(chunk['data'])
    
    file_stream.seek(0)
    return StreamingResponse(file_stream, media_type=file_doc['contentType'])






if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
