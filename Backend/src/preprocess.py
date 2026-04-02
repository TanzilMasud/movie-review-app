import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
 
nltk.download('punkt', quiet=True)
nltk.download('punkt_tab', quiet=True)
nltk.download('stopwords', quiet=True)
 
stop_words = set(stopwords.words('english'))
 
 
def clean_text(text):
    # lowercase
    text = text.lower()
 
    # remove HTML tags
    text = re.sub(r'<.*?>', '', text)
 
    # remove special characters
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)
 
    # tokenize
    tokens = word_tokenize(text)
 
    # remove stopwords
    tokens = [word for word in tokens if word not in stop_words]
 
    return " ".join(tokens)
 
 
if __name__ == "__main__":
    sample = "This movie was AMAZING!!! I loved it."
    print(clean_text(sample))