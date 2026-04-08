function Footer({ setView }) {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">🎬 ReelVibe</div>
                <p className="footer-tagline">Your go-to place for honest movie reviews</p>
                <div className="footer-links">
                    <a href="/" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="footer-link">Home</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setView('topRated'); }} className="footer-link">Top Rated</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setView('about'); }} className="footer-link">About</a>
                </div>
                <p className="footer-copy">© 2026 ReelVibe · Built by Tanzil Masud</p>
            </div>
        </footer>
    );
}

export default Footer;