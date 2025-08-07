# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import predict
from database import connect_to_mongo, close_mongo_connection
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    connect_to_mongo()
    yield
    close_mongo_connection()

app = FastAPI(lifespan=lifespan)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://fake-reviews-predictor-kd4j.vercel.app",
        "https://fake-reviews-predi-git-dbd1f4-ingaleaman2516-gmailcoms-projects.vercel.app",
        "http://localhost:5173/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(predict.router)
