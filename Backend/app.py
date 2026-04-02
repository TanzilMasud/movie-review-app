from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import joblib
import psycopg2
import json
import requests
from dotenv import load_dotenv

# ==============================
# INIT
# ==============================
app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False

# ==============================
# LOAD ENV
# ==============================
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
OMDB_API_KEY = os.getenv("OMDB_API_KEY")
TMDB_API_KEY = os.getenv("TMDB_API_KEY")

# ==============================
# DATABASE CONNECTION
# ==============================


def get_connection():
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
    return conn


# ==============================
# LOAD MODEL
# ==============================
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "models", "model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "models", "vectorizer.pkl")

try:
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Model loading failed: {e}")
    model = None
    vectorizer = None

# ==============================
# SENTIMENT BY RATING
# ==============================


def get_sentiment_by_rating(rating):
    if rating < 3:
        return "Negative 😡"
    elif rating == 3:
        return "Moderate 😐"
    else:
        return "Positive 😄"

# ==============================
# FETCH POSTER FROM TMDB (primary)
# ==============================


def get_poster_tmdb(movie_name):
    try:
        search_url = "https://api.themoviedb.org/3/search/movie"
        params = {
            "api_key": TMDB_API_KEY,
            "query": movie_name,
            "include_adult": False,
            "language": "en-US",
            "page": 1
        }
        res = requests.get(search_url, params=params, timeout=5)
        data = res.json()

        results = data.get("results", [])
        if results:
            results_sorted = sorted(results, key=lambda x: x.get(
                "popularity", 0), reverse=True)
            for movie in results_sorted:
                poster_path = movie.get("poster_path")
                if poster_path:
                    return f"https://image.tmdb.org/t/p/w500{poster_path}"

    except Exception as e:
        print(f"TMDB error: {e}")
    return None

# ==============================
# FETCH POSTER FROM OMDB (fallback)
# ==============================


def get_poster_omdb(movie_name):
    try:
        url = f"http://www.omdbapi.com/?t={movie_name}&apikey={OMDB_API_KEY}"
        res = requests.get(url, timeout=5)
        data = res.json()
        if data.get("Response") == "True" and data.get("Poster") not in [None, "N/A"]:
            return data.get("Poster")
    except Exception:
        pass
    return None

# ==============================
# GET MOVIE POSTER (TMDB first → OMDB fallback)
# ==============================


def get_movie_poster(movie_name):
    # Try TMDB first (faster, better for Indian movies)
    poster = get_poster_tmdb(movie_name)
    if poster:
        return poster

    # Fallback to OMDB
    poster = get_poster_omdb(movie_name)
    if poster:
        return poster

    return None

# ==============================
# ROUTES
# ==============================

# Health check


@app.route("/", methods=["GET"])
def index():
    return app.response_class(
        response=json.dumps(
            {"message": "🎬 Movie Review API is running!"}, ensure_ascii=False),
        mimetype='application/json'
    )

# Search movie


@app.route("/api/search", methods=["GET"])
def search_movie():
    movie = request.args.get("movie", "").strip()

    if not movie:
        return jsonify({"error": "Movie name is required"}), 400

    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute(
                "SELECT review, sentiment, rating FROM reviews WHERE LOWER(movie) = LOWER(%s)",
                (movie,)
            )
            rows = cur.fetchall()
        conn.close()

        # Fetch poster — TMDB first, OMDB fallback
        poster = get_movie_poster(movie)

        if rows:
            reviews = [
                {"review": r[0], "sentiment": r[1], "rating": r[2]}
                for r in rows
            ]
            return app.response_class(
                response=json.dumps({
                    "exists": True,
                    "movie": movie.title(),
                    "poster": poster,
                    "reviews": reviews
                }, ensure_ascii=False),
                mimetype='application/json'
            )
        else:
            return app.response_class(
                response=json.dumps({
                    "exists": False,
                    "movie": movie.title(),
                    "poster": poster,
                    "reviews": []
                }, ensure_ascii=False),
                mimetype='application/json'
            )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Add review
@app.route("/api/review", methods=["POST"])
def add_review():
    data = request.get_json()

    movie = data.get("movie", "").strip()
    review = data.get("review", "").strip()
    rating = int(data.get("rating", 3))

    if not movie or not review:
        return jsonify({"error": "Movie and review are required"}), 400

    sentiment = get_sentiment_by_rating(rating)

    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute(
                "SELECT 1 FROM reviews WHERE LOWER(movie) = LOWER(%s) AND LOWER(review) = LOWER(%s)",
                (movie, review)
            )
            if cur.fetchone():
                return jsonify({"error": "This review already exists!"}), 409

            cur.execute(
                "INSERT INTO reviews (movie, review, sentiment, rating) VALUES (%s, %s, %s, %s)",
                (movie.title(), review, sentiment, rating)
            )
        conn.close()

        return app.response_class(
            response=json.dumps({
                "success": True,
                "movie": movie.title(),
                "review": review,
                "sentiment": sentiment,
                "rating": rating
            }, ensure_ascii=False),
            mimetype='application/json'
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==============================
# RUN
# ==============================
if __name__ == "__main__":
    app.run(debug=True, port=5000)
