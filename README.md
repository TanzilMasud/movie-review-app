<div align="center">
  
# 🎬 ReelVibe: NLP Sentiment Analysis for Movie Reviews

[![React](https://img.shields.io/badge/React-19.2-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000.svg?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-33.8%25-3776AB.svg?style=for-the-badge&logo=python)](https://www.python.org/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.4-F7931E.svg?style=for-the-badge&logo=scikit-learn)](https://scikit-learn.org/)

</div>

<br>

## 🌟 About The Project

ReelVibe is a full-stack, data-driven machine learning project that transforms a basic movie review site into an intelligent platform. By leveraging natural language processing (NLP), ReelVibe automatically classifies movie reviews into positive or negative sentiments while providing detailed analytical insights on every review.

## ✨ Key Features

- **🧠 Live AI Sentiment Analysis:** Type a review, and our Machine Learning model (`scikit-learn`) infers the sentiment (Positive/Negative) in real-time.
- **📊 Vibe Score:** Calculates and displays an aggregated sentiment "vibe" score for movies based on user reviews.
- **🎯 Confidence Percentages:** Exposed AI model confidence stats for every single review, giving users transparency into how the prediction was made.
- **🎨 Dynamic & Premium UI:** The "Top Rated" page features dynamic, visually stunning backgrounds that adjust based on the cinematic atmosphere. 
- **⚡ Fast & Modern Foundation:** Powered by a React / Vite frontend and a Flask RESTful API backend handling machine learning inference.

## 🚀 Live deployment

ReelVibe is live! You can check out the working version here:
👉 movie-review-app-ashen.vercel.app

## 📁 Project Structure

```text
movie-review-app/
├── Backend/                 # Flask Backend & ML
│   ├── app/                 # Core app code
│   ├── data/                # Datasets for model training
│   ├── models/              # Serialized joblib ML models
│   ├── app.py               # Main API Entry point
│   └── requirements.txt     # Python Dependencies
├── Frontend/                # React UI
│   ├── public/              # static files
│   ├── src/                 # React components, Pages, CSS
│   └── package.json         # Node dependencies
└── notebooks/               # Jupyter Notebooks for NLP training & EDA
```
<div align="center">
  Made with  by <a href="https://github.com/TanzilMasud">TanzilMasud</a>
</div>
