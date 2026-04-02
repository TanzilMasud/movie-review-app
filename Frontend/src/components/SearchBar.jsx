import { useState } from "react";
import axios from "axios";

function SearchBar({ onSearch }) {
    const [movie, setMovie] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!movie.trim()) return;
        setLoading(true);
        try {
            const res = await axios.get(
                `http://127.0.0.1:5000/api/search?movie=${movie.trim()}`
            );
            onSearch(res.data, movie.trim());
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Enter movie name..."
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
            />
            <button onClick={handleSearch} disabled={loading}>
                {loading ? <span className="spinner" /> : "🔍 Search"}
            </button>
        </div>
    );
}

export default SearchBar;