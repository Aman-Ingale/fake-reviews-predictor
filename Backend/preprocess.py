import nltk
nltk.data.path.append("./nltk_data")
import string
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

ps = PorterStemmer()
stop_words = set(stopwords.words('english'))
# helper function for preprocessing the text
def transform_text(text: str) -> str:
    text = text.lower()
    tokens = nltk.word_tokenize(text)
    tokens = [t for t in tokens if t.isalnum()]
    tokens = [ps.stem(t) for t in tokens if t not in stop_words and t not in string.punctuation]
    return " ".join(tokens)
