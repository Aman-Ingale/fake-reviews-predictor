from fastapi import FastAPI
from pydantic import BaseModel
import pickle
from preprocess import transform_text
from fastapi.middleware.cors import CORSMiddleware

# Load vectorizer and model
with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

with open("fake_review_predictor.pkl", "rb") as f:
    model = pickle.load(f)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ReviewRequest(BaseModel):
    text: str

@app.post("/predict")
def predict_review(request: ReviewRequest):
    print(len(request.text))
    transformed = transform_text(request.text)
    vectorized = vectorizer.transform([transformed])
    prediction = model.predict(vectorized)
    print(prediction.tolist())
    return {
        "review": request.text,
        "transformed": transformed,
        "result": bool(prediction[0])  # Assuming 1 = fake, 0 = genuine
    }
