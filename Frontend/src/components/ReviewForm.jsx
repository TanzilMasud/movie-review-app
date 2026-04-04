import { useState } from "react";
import axios from "axios";

function ReviewForm({ movie, onReviewAdded }) {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false);

    const showToast = (type, text) => {
        setToast({ type, text });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSubmit = async () => {
        if (!review.trim()) {
            showToast("warning", "⚠️ Please write a review!");
            return;
        }
        if (rating === 0) {
            showToast("warning", "⚠️ Please select a star rating!");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post("https://movie-review-app-bzkp.onrender.com/api/review", {
                movie,
                review,
                rating,
            });

            showToast("success", `✅ Review added! Sentiment: ${res.data.sentiment} | ⭐ ${rating}/5`);

            onReviewAdded({
                review,
                sentiment: res.data.sentiment,
                rating,
            });

            setReview("");
            setRating(0);
        } catch (err) {
            const errMsg = err.response?.data?.error || "Something went wrong!";
            showToast("error", `❌ ${errMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Toast Notification */}
            {toast && (
                <div className={`toast toast-${toast.type}`}>
                    {toast.text}
                </div>
            )}

            <div className="review-form">
                <h3>✍️ Write Your Review</h3>

                <textarea
                    placeholder="Write your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={4}
                    disabled={loading}
                />

                {/* Star Rating */}
                <div className="star-rating-section">
                    <label>Rate this movie:</label>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${star <= (hoveredStar || rating) ? "filled" : ""}`}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredStar(star)}
                                onMouseLeave={() => setHoveredStar(0)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    {rating > 0 && (
                        <span className="rating-label">
                            {rating === 1 && "😞 Poor"}
                            {rating === 2 && "😐 Below Average"}
                            {rating === 3 && "🙂 Average"}
                            {rating === 4 && "😊 Good"}
                            {rating === 5 && "🤩 Excellent"}
                        </span>
                    )}
                </div>

                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? (
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                            <span className="spinner" /> Submitting...
                        </span>
                    ) : (
                        "Submit Review"
                    )}
                </button>
            </div>
        </>
    );
}

export default ReviewForm;