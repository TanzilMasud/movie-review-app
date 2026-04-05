function ReviewCard({ movie, reviews, poster }) {
    const getSentimentColor = (sentiment) => {
        if (sentiment.includes("Positive")) return "#16a34a";
        if (sentiment.includes("Moderate")) return "#d97706";
        return "#dc2626";
    };

    // Calculate average rating
    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    // Generate star display
    const renderStars = (rating) => {
        return [1, 2, 3, 4, 5].map((star) => (
            <span
                key={star}
                style={{ color: star <= Math.round(rating) ? "#f59e0b" : "#ccc", fontSize: "1rem" }}
            >
                ★
            </span>
        ));
    };

    return (
        <div className="review-card">
            <div className="card-left">
                {poster ? (
                    <img
                        src={poster}
                        alt={movie}
                        onError={(e) => { e.target.style.display = 'none'; }}
                        style={{
                            width: "90px",
                            height: "135px",
                            borderRadius: "10px",
                            objectFit: "cover",
                        }}
                    />
                ) : (
                    <div className="poster-placeholder">🎬</div>
                )}
            </div>

            <div className="card-right">
                {/* Movie title + review count badge */}
                <div className="card-title-row">
                    <h3>🎬 {movie}</h3>
                    <span className="review-count-badge">
                        {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                    </span>
                </div>

                {/* Average rating */}
                <div className="avg-rating-row">
                    <div className="avg-stars">{renderStars(avgRating)}</div>
                    <span className="avg-rating-text">
                        <strong>{avgRating}</strong> / 5 avg
                    </span>
                </div>

                <hr className="card-divider" />

                {/* Individual reviews */}
                {reviews.map((r, i) => (
                    <div key={i}>
                        {i > 0 && <hr className="review-divider" />}
                        <p className="review-text">📝 {r.review}</p>
                        <p className="review-meta">
                            ⭐ {r.rating}/5 &nbsp;|&nbsp;
                            <span style={{ color: getSentimentColor(r.sentiment) }}>
                                <strong>{r.sentiment}</strong>
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewCard;