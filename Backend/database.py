# database.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = None
db = None

def connect_to_mongo():
    global client, db
    MONGO_URL = os.getenv("MONGO_URL")
    client = MongoClient(MONGO_URL)
    db = client["reviews"]
    print("MongoDB connected")

def close_mongo_connection():
    if client:
        client.close()
        print("MongoDB connection closed")
