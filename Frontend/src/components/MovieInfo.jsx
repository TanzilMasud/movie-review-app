function MovieInfo({ info }) {
    if (!info) return null;

    const { genre, year, plot, imdb_rating, language } = info;

    // Don't render if no info available
    if (!genre && !year && !plot && !imdb_rating) return null;

    return (
        <div className="movie-info-card">
            <div className="movie-info-tags">
                {year && (
                    <span className="info-tag">
                        📅 {year}
                    </span>
                )}
                {language && (
                    <span className="info-tag">
                        🌐 {language}
                    </span>
                )}
                {imdb_rating && imdb_rating !== "N/A" && (
                    <span className="info-tag imdb-tag">
                        ⭐ IMDB {imdb_rating}
                    </span>
                )}
                {genre && genre.split(", ").map((g, i) => (
                    <span key={i} className="info-tag genre-tag">
                        🎭 {g}
                    </span>
                ))}
            </div>
            {plot && (
                <p className="movie-plot">📖 {plot}</p>
            )}
        </div>
    );
}

export default MovieInfo;