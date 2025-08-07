from database import db
from models.review import Review

def create_review(review: Review):
    try:
        review_dict = review.dict()
        result = db.insert_one(review_dict)
        return True
    except Exception as e:
        print(e)
        return False
