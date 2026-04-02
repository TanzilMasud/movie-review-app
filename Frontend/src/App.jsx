import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ReviewCard from "./components/ReviewCard";
import ReviewForm from "./components/ReviewForm";
import "./App.css";

function App() {
  const [searchResult, setSearchResult] = useState(null);
  const [searchedMovie, setSearchedMovie] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSearch = (result, movie) => {
    setSearchResult(result);
    setSearchedMovie(result.movie);
    setReviewSubmitted(false); // reset on new search
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
      {/* Header */}
      <div className="header">
        <h1>🎬 Movie Review System</h1>
        <p>Search any movie and share your review</p>
      </div>

      {/* Search */}
      <SearchBar onSearch={handleSearch} />

      {/* Results */}
      {searchResult && (
        <div className="results">

          {/* ==============================
              CASE 1: Movie existed before search
          ============================== */}
          {searchResult.exists && !reviewSubmitted && (
            <>
              <div className="exists-banner">
                ✅ Movie already exists! Showing all reviews for{" "}
                <strong>{searchResult.movie}</strong>
              </div>
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

          {/* ==============================
              CASE 2: New movie — not yet reviewed
          ============================== */}
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
              <ReviewForm
                movie={searchedMovie}
                onReviewAdded={handleReviewAdded}
              />
            </>
          )}

          {/* ==============================
              CASE 3: After submitting a review (new or existing)
          ============================== */}
          {reviewSubmitted && (
            <>
              <div className="exists-banner">
                🎉 Review submitted! Here are all reviews for{" "}
                <strong>{searchResult.movie}</strong>
              </div>
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
  );
}

export default App;