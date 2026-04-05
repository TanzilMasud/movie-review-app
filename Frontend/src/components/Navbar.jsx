function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-logo">
                    🎬 <span>CineReview</span>
                </div>
                <div className="navbar-links">
                    <a href="#" className="nav-link" onClick={() => window.scrollTo(0, 0)}>Home</a>
                    <a href="#" className="nav-link">Top Rated</a>
                    <a href="#" className="nav-link">About</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;