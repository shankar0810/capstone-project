import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../../assests/logo.png';

function Head() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header-container1 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="logo">
          <img src={logo} alt="HealthHub Logo" />
        </Link>
        <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/#informative-articles" className="nav-link">About Us</Link>
          <Link to="/signin" className="nav-link">Sign In</Link>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </nav>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div />
          <div />
          <div />
        </div>
      </div>
    </header>
  );
}

export default Head;
