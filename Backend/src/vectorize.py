import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer

# Load preprocessed data
df = pd.read_csv("data/cleaned_reviews.csv")

# Initialize vectorizer
vectorizer = CountVectorizer(max_features=5000)

# Fit and transform
X = vectorizer.fit_transform(df['cleaned_review'])

# Convert to array
X_array = X.toarray()

print("Shape of Data:", X_array.shape)
print("\nSample Vector:\n", X_array[0])