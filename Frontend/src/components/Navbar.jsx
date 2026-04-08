import logoImage from '../assets/logo.png';

function Navbar({ setView }) {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-logo" onClick={() => window.location.reload()} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <img src={logoImage} alt="Logo" style={{ height: '36px', width: 'auto', borderRadius: '4px' }} /> <span>ReelVibe</span>
                </div>
                <div className="navbar-links">
                    <a href="/" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="nav-link">Home</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setView('topRated'); }} className="nav-link">Top Rated</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setView('about'); }} className="nav-link">About</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;