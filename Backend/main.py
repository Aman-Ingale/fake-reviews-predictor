from fastapi import FastAPI
from pydantic import BaseModel
import pickle
from preprocess import transform_text
from fastapi.middleware.cors import CORSMiddleware
# loading tokenizer and model from pickle file
with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

with open("fake_review_predictor.pkl", "rb") as f:
    model = pickle.load(f)
# setting up fastAPI and CORS configuration
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://fake-reviews-predictor-kd4j.vercel.app","https://fake-reviews-predi-git-dbd1f4-ingaleaman2516-gmailcoms-projects.vercel.app",
    "http://localhost:5173/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReviewRequest(BaseModel):
    text: str
# POST request handler for /predict route
@app.post("/predict")
def predict_review(request: ReviewRequest):
    print(len(request.text))
    transformed = transform_text(request.text)  # text transformation using utilities in preprocess.py
    vectorized = vectorizer.transform([transformed])  #vectorizing text into TF-IDF format
    prediction = model.predict(vectorized) # sending input data to model for prediction
    print("request : ",request.text,prediction.tolist())
    return {
        "review": request.text,
        "transformed": transformed,
        "result": bool(prediction[0])  # 1 = fake, 0 = genuine
    }
@app.get("/ping")
def ping():
    return {"status": "ok"}