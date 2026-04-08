function Navbar({ setView }) {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-logo" onClick={() => setView('home')} style={{cursor: 'pointer'}}>
                    🎬 <span>ReelVibe</span>
                </div>
                <div className="navbar-links">
                    <a href="#" onClick={(e) => { e.preventDefault(); setView('home'); }} className="nav-link">Home</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setView('topRated'); }} className="nav-link">Top Rated</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setView('about'); }} className="nav-link">About</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;