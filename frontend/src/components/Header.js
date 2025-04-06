import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <Link className="navbar-brand" to="/">
            <span className="logo-text">Monk</span>
            <span className="logo_dot">Technologies</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={() => setIsOpen(false)}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services" onClick={() => setIsOpen(false)}>
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/case-studies" onClick={() => setIsOpen(false)}>
                  Case Studies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog" onClick={() => setIsOpen(false)}>
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 