from fastapi import APIRouter
from my_controllers.controller import read_root , upload_file , delete_file , get_file 
my_router = APIRouter()

my_router.get("/")(read_root)
my_router.post("/uploadfile/{student_name}")(upload_file)
my_router.delete("/deletefile/{file_id}/{student_name}")(delete_file)
my_router.get("/getfile/{file_id}/{student_name}")(get_file)
