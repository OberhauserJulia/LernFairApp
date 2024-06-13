from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.responses import JSONResponse
from pymongo import MongoClient
import gridfs
import io
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import pymongo
from bson import ObjectId
from bson import json_util
import json
import uvicorn

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

#Speichert File in eine Übersicht geordnet nach Fach
def safe_tags(db : object ,subname, document): 
    collection = db[subname] 
    document_id = collection.insert_one(document).inserted_id
    return document_id

def deletefile(student_name : str, collectionname : str, file_id : str): 
    # Wähle die Datenbank basierend auf dem Namen des Schülers
        db = client[student_name]
        fs = gridfs.GridFS(db)
        
        # Lösche die Datei aus GridFS
        fs.delete(ObjectId(file_id))
        
        # Lösche das Dokument aus der Sammlung
        db[collectionname].delete_one({"file_id": file_id})

def safe_chunks_files( student_name : str, file_data : bytes, file : UploadFile) : 
    db = client[student_name]
    fs = gridfs.GridFS(db)
    # Speichere die Datei in GridFS
    file_id = fs.put(file_data, filename=file.filename, content_type=file.content_type)
    return file_id

#returtns the file as a streaming response
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


@app.get("/")
def read_root():
    return JSONResponse(content={"message": "Hello World"}, status_code=200)


@app.post("/uploadfile/{student_name}")
async def upload_file(student_name: str, file: UploadFile = File(...), documentname: str = Form(...), subjectname : str = Form(...) , topic : str = Form(...) ) :
    # Lies den Dateiinhalt
    file_data = await file.read()
    db = client[student_name]
    fs = gridfs.GridFS(db)
    
    try:
        if  file.filename != "none" and documentname != "none" and subjectname != "none" and topic != "none":
            file_id = safe_chunks_files( student_name, file_data, file)
            print(file_id)
            safe_tags(db, subjectname, {"subject" : subjectname , "file_id" : str(file_id), "name" : file.filename, "documentname" : documentname , "topic" : topic})
            return JSONResponse(content={"file_id": str(file_id)}, status_code=200)

        else : 
            print("Backlog")
            file_id = fs.put(file_data, filename=file.filename, content_type=file.content_type)

            taglist = {"subject" : subjectname , "file_id" : str(file_id), "name" : file.filename, "documentname" : documentname , "topic" : topic}
            tagged_attr = {}
            for key in taglist:
                if taglist[key] != "none":
                    tagged_attr[key] = taglist[key]
                

            tagged_attr["file_id"] = str(file_id)
            safe_tags(db, "Backlog", tagged_attr)
            return JSONResponse(content={"file_id": str(file_id)}, status_code=200)


    except Exception as e:
        print(f"An error occurred: {e}")


@app.delete("/deletefile/{file_id}/{student_name}/{subject_name}")
async def delete_file(file_id: str, student_name: str, subject_name: str):
    try:
        deletefile(student_name, subject_name, file_id)

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


@app.get("/getfiles/{student_name}/{subject_name}")
def get_all(student_name : str, subject_name : str):
    try:
        db = client[student_name]
        collection = db[subject_name]
        files = []
        for file in collection.find():
            files.append(json.loads(json_util.dumps(file)))  # Convert ObjectId to string
        return JSONResponse(content={"files": files}, status_code=200)
    except Exception as e:
        print("Fehler: ", e)
        return JSONResponse(content={"error": str(e)}, status_code=500) 




#Funktionen für Backlog Barbeitung: 
@app.put("/updatefile/{student_name}/{file_id}")
async def update_file(student_name: str, file_id: str, documentname: str = Form(...), subjectname: str = Form(...), topic: str = Form(...), filename: str = Form(...)):
    try:
        print("Update File")
        db = client[student_name]
        
        # Überprüfen, ob alle Attribute vorhanden sind
        if subjectname == "none" or documentname == "none" or topic == "none" or filename == "none":
            return JSONResponse(content={"error": "Missing required attributes"}, status_code=400)
        
        # Schlüsseldatei erstellen
        safe_tags(db, subjectname, {"Fach": subjectname, "file_id": str(file_id), "name": filename, "documentname": documentname, "topic": topic})
        
        # File aus dem Backlog löschen
        deletefile(student_name, "Backlog", file_id)
        
        return JSONResponse(content={"message": "File updated successfully"}, status_code=200)
    
    except Exception as e:
        print("Fehler: ", e)
        return JSONResponse(content={"error": str(e)}, status_code=500)
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
