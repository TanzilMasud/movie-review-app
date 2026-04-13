import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ReviewCard from "./components/ReviewCard";
import ReviewForm from "./components/ReviewForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieInfo from "./components/MovieInfo";
import Skeleton from "./components/Skeleton";
import "./App.css";

const FLOATING_POSTERS = [
  "https://image.tmdb.org/t/p/w200/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
  "https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  "https://image.tmdb.org/t/p/w200/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
  "https://image.tmdb.org/t/p/w200/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
  "https://image.tmdb.org/t/p/w200/iuFNMS8vlbE7pQSSBSI2WBBmLEa.jpg",
  "https://image.tmdb.org/t/p/w200/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
  "https://image.tmdb.org/t/p/w200/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  "https://image.tmdb.org/t/p/w200/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
  "https://image.tmdb.org/t/p/w200/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
  "https://image.tmdb.org/t/p/w200/ym1dxyOk4jFcSl4Q2zmRRUtJNLm.jpg",
];

function App() {
  const [searchResult, setSearchResult] = useState(null);
  const [searchedMovie, setSearchedMovie] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState("home");
  const [topMovies, setTopMovies] = useState([]);
  const [loadingTop, setLoadingTop] = useState(false);

  // WARM-UP PING
  // Automatically trigger the backend to wake up from its free-tier sleep the exact second the user loads the frontend
  useEffect(() => {
    fetch("https://movie-review-app-bzkp.onrender.com/")
      .catch((err) => console.log("Warm-up ping ignored:", err));
  }, []);

  useEffect(() => {
    if (view === "topRated" && topMovies.length === 0) {
      setLoadingTop(true);
      fetch("https://movie-review-app-bzkp.onrender.com/api/top_rated")
        .then(res => res.json())
        .then(data => {
          setTopMovies(data || []);
          setLoadingTop(false);
        })
        .catch(err => {
          console.error(err);
          setLoadingTop(false);
        });
    }
  }, [view]);

  const renderVibeMeter = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    const pos = reviews.filter(r => r.sentiment.includes("Positive")).length;
    const score = Math.round((pos / reviews.length) * 100);
    const color = score >= 50 ? "#28a745" : "#dc3545";
    return (
      <div className="fade-in" style={{ margin: "15px 0", padding: "12px", background: "rgba(255,255,255,0.9)", borderRadius: "8px", border: `2px solid ${color}`, textAlign: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <h3 style={{ margin: 0, color: color }}>🤖 AI Vibe Meter: {score}% Positive Feedback</h3>
        <p style={{ margin: "5px 0 0", fontSize: "0.9rem", color: "#666" }}>Based on {reviews.length} user reviews analyzed by NLP model</p>
      </div>
    );
  };

  const handleSearch = (result, movie) => {
    setSearchResult(result);
    setSearchedMovie(result.movie);
    setReviewSubmitted(false);
  };

  const handleReviewAdded = (newReview) => {
    setReviewSubmitted(true);
    setSearchResult((prev) => ({
      ...prev,
      exists: true,
      reviews: [...(prev?.reviews || []), newReview],
    }));
  };

  return (
    <div className="app">

      {/* Floating Background Posters */}
      <div className="floating-bg">
        {FLOATING_POSTERS.map((poster, i) => (
          <img
            key={i}
            src={poster}
            alt=""
            className={`floating-poster floating-poster-${i + 1}`}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ))}
      </div>

      {/* Navbar */}
      <Navbar setView={setView} />

      {/* Main Content */}
      <div className="content">
        {view === "home" && (
          <div className="fade-in">
            {/* Header */}
            <div className="header">
              <h1>🎬 Movie Review System</h1>
              <p>Search any movie and share your review</p>
            </div>

            {/* Search */}
            <SearchBar onSearch={handleSearch} onLoading={setIsLoading} />

            {/* Loading Skeleton */}
            {isLoading && <Skeleton />}

            {/* Empty State */}
            {!isLoading && !searchResult && (
              <div className="empty-state fade-in">
                <span className="empty-emoji">🍿</span>
                <h2>Ready for a movie night?</h2>
                <p>Type a movie name above to discover its vibe or share your own review.</p>
              </div>
            )}

            {/* Results */}
            {!isLoading && searchResult && (
              <div className="results">

                {/* CASE 1: Movie existed */}
                {searchResult.exists && !reviewSubmitted && (
                  <>
                    <div className="exists-banner">
                      ✅ Movie already exists! Showing all reviews for{" "}
                      <strong>{searchResult.movie}</strong>
                    </div>
                    <MovieInfo info={searchResult.info} />
                    {renderVibeMeter(searchResult.reviews)}
                    <ReviewCard
                      movie={searchResult.movie}
                      reviews={searchResult.reviews}
                      poster={searchResult.poster}
                    />
                    <div className="add-more">➕ Want to add your review too?</div>
                    <ReviewForm
                      movie={searchedMovie}
                      onReviewAdded={handleReviewAdded}
                    />
                  </>
                )}

                {/* CASE 2: New movie */}
                {!searchResult.exists && !reviewSubmitted && (
                  <>
                    <div className="new-movie-poster">
                      {searchResult.poster ? (
                        <img
                          src={searchResult.poster}
                          alt={searchResult.movie}
                          onError={(e) => { e.target.style.display = 'none'; }}
                          style={{
                            width: "120px",
                            height: "180px",
                            borderRadius: "12px",
                            objectFit: "cover",
                            marginBottom: "12px",
                          }}
                        />
                      ) : (
                        <div className="poster-placeholder" style={{
                          width: "120px",
                          height: "180px",
                          fontSize: "3rem",
                          borderRadius: "12px",
                          marginBottom: "12px",
                        }}>🎬</div>
                      )}
                    </div>
                    <div className="new-banner">
                      🆕 <strong>{searchResult.movie}</strong> is a new movie! Be the first to review it.
                    </div>
                    <MovieInfo info={searchResult.info} />
                    <ReviewForm
                      movie={searchedMovie}
                      onReviewAdded={handleReviewAdded}
                    />
                  </>
                )}

                {/* CASE 3: After submitting */}
                {reviewSubmitted && (
                  <>
                    <div className="exists-banner">
                      🎉 Review submitted! Here are all reviews for{" "}
                      <strong>{searchResult.movie}</strong>
                    </div>
                    <MovieInfo info={searchResult.info} />
                    {renderVibeMeter(searchResult.reviews)}
                    <ReviewCard
                      movie={searchResult.movie}
                      reviews={searchResult.reviews}
                      poster={searchResult.poster}
                    />
                    <div className="add-more">➕ Want to add another review?</div>
                    <ReviewForm
                      movie={searchedMovie}
                      onReviewAdded={handleReviewAdded}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {view === "topRated" && (
          <div className="top-rated-view fade-in">
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>🏆 Top Rated Movies</h2>
            <p style={{ color: '#555', marginBottom: '20px' }}>The highest rated films according to ReelVibe users.</p>
            <div className="mock-grid" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {loadingTop ? (
                <Skeleton />
              ) : (
                topMovies.length > 0 ? topMovies.map((m, i) => (
                  <div key={i} className="review-card fade-in" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      {m.poster && <img src={m.poster} alt={m.movie} style={{ width: '40px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />}
                      <h3 style={{ margin: 0, fontSize: '1.2rem'}}>{m.movie}</h3>
                    </div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>⭐ {m.avg_rating} / 5</span>
                  </div>
                )) : <p>No top rated movies found.</p>
              )}
            </div>
          </div>
        )}

        {view === "about" && (
          <div className="about-view fade-in review-card" style={{ flexDirection: 'column', gap: '15px' }}>
            <h2 style={{ fontSize: '2rem', color: '#1a1a1a' }}>ℹ️ About ReelVibe</h2>
            <p style={{ fontSize: '1.1rem', color: '#ff4b2b', fontWeight: 'bold' }}>Powered by Machine Learning</p>
            <p style={{ fontSize: '1rem', color: '#444', lineHeight: '1.6' }}>ReelVibe isn't just another movie database. It's an intelligent sentiment analysis engine!</p>
            <p style={{ fontSize: '1rem', color: '#444', lineHeight: '1.6' }}>When you leave a review, our trained Natural Language Processing model instantly analyzes your text to calculate whether your vibe is Positive or Negative. The more you review, the smarter it gets.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer setView={setView} />

    </div>
  );
}

export default App;