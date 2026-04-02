function ReviewCard({ movie, reviews, poster }) {
    const getSentimentColor = (sentiment) => {
        if (sentiment.includes("Positive")) return "#22c55e";
        if (sentiment.includes("Moderate")) return "#f59e0b";
        return "#ef4444";
    };

    return (
        <div className="review-card">
            <div className="card-left">
                {poster ? (
                    <img
                        src={poster}
                        alt={movie}
                        style={{
                            width: "80px",
                            height: "120px",
                            borderRadius: "10px",
                            objectFit: "cover",
                        }}
                    />
                ) : (
                    <div className="poster-placeholder">🎬</div>
                )}
            </div>
            <div className="card-right">
                <h3>🎬 {movie}</h3>
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