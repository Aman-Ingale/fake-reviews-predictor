from pydantic import BaseModel, Field
from datetime import datetime

class Review(BaseModel):
    text: str = Field(..., description="Text submitted by the user")
    prediction: int = Field(..., ge=0, le=1, description="ML prediction: 1 = Negative/Fake, 0 = Positive/Genuine")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Time of prediction creation")
