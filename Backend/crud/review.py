from database import get_db
from models.review import Review

def create_review(review: Review):
    try:
        db = get_db()
        review_dict = review.dict()
        result = db.reviews.insert_one(review_dict)
        return True
    except Exception as e:
        print(e)
        return False
