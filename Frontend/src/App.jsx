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
      <Navbar />

      {/* Main Content */}
      <div className="content">
        {/* Header */}
        <div className="header">
          <h1>🎬 Movie Review System</h1>
          <p>Search any movie and share your review</p>
        </div>

        {/* Search */}
        <SearchBar onSearch={handleSearch} onLoading={setIsLoading} />

        {/* Loading Skeleton */}
        {isLoading && <Skeleton />}

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

          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;