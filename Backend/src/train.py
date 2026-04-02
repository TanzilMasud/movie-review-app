import pandas as pd
from preprocess import clean_text
pd.set_option('display.max_colwidth', None)
pd.set_option('display.width', 1000)

# load dataset
df = pd.read_csv("data/reviews.csv")

# check first few rows
print("Original Data:")
print(df.head())

# apply preprocessing
df['cleaned_review'] = df['review'].apply(clean_text)

# show cleaned data
print("\nAfter Preprocessing:")
print(df[['review', 'cleaned_review']].head(1))

# convert sentiment labels (important for ML later)
df['sentiment'] = df['sentiment'].map({'positive': 1, 'negative': 0})

# save cleaned dataset (optional but recommended)
df.to_csv("data/cleaned_reviews.csv", index=False)

print("\n✅ Preprocessing Completed and Saved!")