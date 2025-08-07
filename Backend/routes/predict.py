from pydantic import BaseModel
import pickle
from preprocess import transform_text
from fastapi import APIRouter
from models.review import Review
from crud.review import create_review
from datetime import datetime

router = APIRouter()

with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

with open("fake_review_predictor.pkl", "rb") as f:
    model = pickle.load(f)
class ReviewRequest(BaseModel):
    text: str

@router.post("/predict")
def predict_review(request: ReviewRequest):
    print(len(request.text))
    transformed = transform_text(request.text)
    vectorized = vectorizer.transform([transformed])
    prediction = model.predict(vectorized)
    review = Review(prediction=prediction, text=request.text, created_at=datetime.utcnow())

    print(prediction.tolist())
    if(create_review(review)):   
        return {
            "review": request.text,
            "transformed": transformed,
            "result": bool(prediction[0])  # Assuming 1 = fake, 0 = genuine
        }
