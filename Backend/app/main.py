import streamlit as st
import os
import joblib
import html as html_lib
import psycopg2
from dotenv import load_dotenv

# ==============================
# PAGE CONFIG
# ==============================
st.set_page_config(page_title="Movie Review System", layout="centered")

# ==============================
# LOAD CSS
# ==============================


def load_css():
    css_path = os.path.join(os.path.dirname(__file__), "styles", "style.css")
    if os.path.exists(css_path):
        with open(css_path) as f:
            st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)


load_css()

# ==============================
# TITLE
# ==============================
st.title("🎬 Movie Review System")

# ==============================
# LOAD ENV & CONNECT DB
# ==============================
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")


def get_connection():
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
    return conn


try:
    conn = get_connection()
except Exception as e:
    st.error(f"❌ Database connection failed: {e}")
    st.stop()

# ==============================
# LOAD MODEL
# ==============================
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "models", "vectorizer.pkl")

try:
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
except Exception:
    st.error("❌ Model not found! Please train the model first.")
    st.stop()

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


def get_sentiment_color(sentiment):
    if "Positive" in sentiment:
        return "#22c55e"
    elif "Moderate" in sentiment:
        return "#f59e0b"
    else:
        return "#ef4444"

# ==============================
# DATABASE FUNCTIONS
# ==============================


def get_reviews(movie_name):
    with conn.cursor() as cur:
        cur.execute(
            "SELECT review, sentiment, rating FROM reviews WHERE LOWER(movie) = LOWER(%s)",
            (movie_name.strip(),)
        )
        return cur.fetchall()


def review_exists(movie_name, review_text):
    with conn.cursor() as cur:
        cur.execute(
            "SELECT 1 FROM reviews WHERE LOWER(movie) = LOWER(%s) AND LOWER(review) = LOWER(%s)",
            (movie_name.strip(), review_text.strip())
        )
        return cur.fetchone() is not None


def add_review(movie_name, review_text, sentiment, rating):
    with conn.cursor() as cur:
        cur.execute(
            "INSERT INTO reviews (movie, review, sentiment, rating) VALUES (%s, %s, %s, %s)",
            (movie_name.strip().title(), review_text.strip(), sentiment, rating)
        )

# ==============================
# RENDER ALL REVIEWS IN ONE CARD
# ==============================


def render_grouped_card(movie_name, rows):
    reviews_html = ""
    for i, row in enumerate(rows):
        review_text, sentiment, rating = row
        color = get_sentiment_color(str(sentiment))
        safe_review = html_lib.escape(str(review_text))
        safe_sentiment = html_lib.escape(str(sentiment))

        divider = "<hr style='border:0;border-top:1px solid rgba(255,255,255,0.08);margin:10px 0;'>" if i > 0 else ""

        reviews_html += (
            divider
            + "<p style='margin:4px 0;font-size:14px;'>" + safe_review + "</p>"
            + "<p style='margin:2px 0;'>&#11088; " +
            str(int(rating)) + "/5 &nbsp;|&nbsp;"
            + "<span style='color:" + color + ";'><b>" + safe_sentiment + "</b></span></p>"
        )

    full_html = (
        "<div style='background:rgba(255,255,255,0.05);padding:20px;border-radius:12px;"
        "margin-bottom:12px;border:1px solid rgba(255,255,255,0.08);'>"
        "<div style='display:flex;gap:15px;align-items:flex-start;'>"
        "<div style='width:80px;height:120px;background:#1f2937;border-radius:10px;"
        "display:flex;align-items:center;justify-content:center;font-size:40px;flex-shrink:0;'>"
        "🎬</div>"
        "<div style='flex:1;'>"
        "<h4 style='margin:0 0 10px 0;'>🎬 " +
        html_lib.escape(movie_name.title()) + "</h4>"
        + reviews_html
        + "</div></div></div>"
    )

    st.markdown(full_html, unsafe_allow_html=True)


# ==============================
# STEP 1: MOVIE SEARCH
# ==============================
col1, col2 = st.columns([4, 1])
with col1:
    movie = st.text_input("🎬 Enter Movie Name", key="movie_input")
with col2:
    st.markdown("<br>", unsafe_allow_html=True)
    search = st.button("🔍 Search")

# ==============================
# STEP 2: TRIGGER ON SEARCH
# ==============================
if search and movie.strip():
    st.session_state["searched_movie"] = movie.strip()

# ==============================
# STEP 3: SHOW RESULTS
# ==============================
if "searched_movie" in st.session_state:
    movie = st.session_state["searched_movie"]
    movie_lower = movie.lower()

    existing = get_reviews(movie_lower)

    if existing:
        st.success(
            f"✅ Movie already exists! Showing all reviews for **{movie.title()}**")
        st.subheader("📖 Existing Reviews")
        render_grouped_card(movie, existing)
        st.markdown("---")
        st.subheader("➕ Want to add your review too?")
    else:
        st.info(
            f"🆕 **{movie.title()}** is a new movie! Be the first to review it.")
        st.subheader("✍️ Write Your Review")

    # ==============================
    # STEP 4: REVIEW FORM
    # ==============================
    with st.form("review_form", clear_on_submit=True):
        review = st.text_area("Write your review")
        rating = st.slider("⭐ Rate this movie", 1, 5, 3)
        submitted = st.form_submit_button("Submit Review")

    if submitted:
        if review.strip() == "":
            st.warning("⚠️ Please write a review before submitting.")
        elif review_exists(movie_lower, review):
            st.warning("⚠️ This exact review already exists!")
        else:
            sentiment = get_sentiment_by_rating(rating)
            add_review(movie, review, sentiment, rating)
            st.success(
                f"✅ Review saved! Sentiment: {sentiment} | ⭐ {rating}/5")
            del st.session_state["searched_movie"]
            st.rerun()
