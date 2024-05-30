from fastapi import UploadFile, HTTPException, Form, File
import sys
from fastapi.responses import JSONResponse
from my_services.homework_service import save_file, remove_file, fetch_file, read_root_service

async def read_root():
    return read_root_service()

async def upload_file(student_name: str, file: UploadFile = File(...), documentname: str = Form(...)):
    try:
        file_id = await save_file(student_name, file, documentname)
        return JSONResponse(content={"file_id": str(file_id)}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

async def delete_file(file_id: str, student_name: str):
    try:
        await remove_file(file_id, student_name)
        return JSONResponse(content={"message": "File deleted successfully"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

async def get_file(file_id: str, student_name: str):
    try:
        file = await fetch_file(file_id, student_name)
        return file
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
