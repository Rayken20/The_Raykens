import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/raykens.png'; // Import the hotel logo

const Navbar = () => {
  const location = useLocation();

  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const footer = document.getElementById('footer');
      footer.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#footer';
    }
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#B87333' }}>
      <div className="container">
        {/* Logo aligned to the left */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Hotel Logo" height="120" className="mr-3" />
        </Link>
        {/* Toggle button for collapsing */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Navbar links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: 'white' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/hotels" style={{ color: 'white' }}>Hotels</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/meetings" style={{ color: 'white' }}>Meetings and Events</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/spa" style={{ color: 'white' }}>Spa Day</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#about" onClick={handleAboutClick} style={{ color: 'white' }}>About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#footer" onClick={handleContactClick} style={{ color: 'white' }}>Contact</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/meal" style={{ color: 'white' }}>Meal</Link> {/* Add Meal link */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" style={{ color: 'white' }}>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register" style={{ color: 'white' }}>Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
