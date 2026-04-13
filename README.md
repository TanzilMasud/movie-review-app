<div align="center">
  
# 🎬 ReelVibe: NLP Sentiment Analysis for Movie Reviews

[![React](https://img.shields.io/badge/React-19.2-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000.svg?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-33.8%25-3776AB.svg?style=for-the-badge&logo=python)](https://www.python.org/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.4-F7931E.svg?style=for-the-badge&logo=scikit-learn)](https://scikit-learn.org/)

**[🚀 Vist the Live Demo Here](YOUR_LIVE_LINK_HERE)** 

*Experience real-time AI-powered movie review sentiment analysis with a seamless UI.*

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

## 🛠️ Technology Stack

**Frontend:**
- React (via Vite)
- Vanilla CSS with a focus on modern glassmorphism and dynamic micro-animations
- Axios for API communication

**Backend:**
- Python & Flask
- `scikit-learn` for NLP/Machine Learning model
- `joblib` for model serialization
- PostgreSQL (via `psycopg2`) for robust data persistence
- deployed with Gunicorn

## 🚀 Live deployment

ReelVibe is live! You can check out the working version here:
👉 **[ReelVibe Live App](YOUR_LIVE_LINK_HERE)**

*(Make sure to replace `YOUR_LIVE_LINK_HERE` with your actual Vercel/Render URL!)*

## 💻 Running Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- PostgreSQL

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TanzilMasud/movie-review-app.git
   cd movie-review-app
   ```

2. **Setup the Backend**
   ```bash
   cd Backend
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   
   # Add your .env file with necessary variables (e.g. Database URL)
   ```

3. **Run the Backend**
   ```bash
   flask run --port=5000
   # or
   python app.py
   ```

4. **Setup and Run the Frontend**
   ```bash
   cd ../Frontend
   npm install
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser.

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

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/TanzilMasud/movie-review-app/issues).

---
<div align="center">
  Made with ❤️ by <a href="https://github.com/TanzilMasud">TanzilMasud</a>
</div>
