import joblib
from preprocess import clean_text

# Load model and vectorizer
model = joblib.load("models/model.pkl")
vectorizer = joblib.load("models/vectorizer.pkl")


def predict_sentiment(text):
    cleaned = clean_text(text)
    vector = vectorizer.transform([cleaned])
    prediction = model.predict(vector)[0]
    return "Positive 😊" if prediction == 1 else "Negative 😞"


if __name__ == "__main__":
    user_input = input("Enter a review: ")
    result = predict_sentiment(user_input)
    print("Sentiment:", result)