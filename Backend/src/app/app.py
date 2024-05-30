from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from my_routers.router  import my_router

app = FastAPI()

# Erlaube CORS für alle Ursprünge (*)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(my_router)
