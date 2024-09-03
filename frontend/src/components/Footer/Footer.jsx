/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer-container p-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 HealthHub</p>
        <ul className="flex space-x-2">
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms & Conditions</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;