import { useState } from "react";
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
              <h1>🎬 ReelVibe</h1>
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

            )}

          </div>
        )}

        {view === "topRated" && (
          <div className="top-rated-view fade-in">
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>🏆 Top Rated Movies</h2>
            <p style={{ color: '#555', marginBottom: '20px' }}>The highest rated films according to ReelVibe users.</p>
            <div className="mock-grid" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
               <div className="review-card fade-in" style={{ justifyContent: 'space-between' }}><h3>The Dark Knight</h3><span>⭐ 4.8 / 5</span></div>
               <div className="review-card fade-in" style={{ justifyContent: 'space-between' }}><h3>Inception</h3><span>⭐ 4.7 / 5</span></div>
               <div className="review-card fade-in" style={{ justifyContent: 'space-between' }}><h3>Interstellar</h3><span>⭐ 4.6 / 5</span></div>
               <div className="review-card fade-in" style={{ justifyContent: 'space-between' }}><h3>Avengers: Endgame</h3><span>⭐ 4.5 / 5</span></div>
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