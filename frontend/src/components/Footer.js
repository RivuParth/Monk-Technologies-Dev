import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.scss';

const Footer = () => {
  
  return (
    <footer className="footer_section">
      <div className="bubbles-wrapper">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="bubble">
            <span className="dot"></span>
          </div>
        ))}
      </div>
      <div className="footer_top">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="footer_contact">
                <h5>Contact Us</h5>
                <div className="contact_link_box">
                  <a href="tel:+1234567890">
                    <i className="fas fa-phone" aria-hidden="true"></i>
                    <span>+1 234 567 890</span>
                  </a>
                  <a href="mailto:info@monktech.com">
                    <i className="fas fa-envelope" aria-hidden="true"></i>
                    <span>info@monktech.com</span>
                  </a>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                    <span>123 Tech Street, Digital City</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="footer_detail">
                <div className="footer_logo">
                  <h3>Our<span className="logo_dot">Services</span></h3>
                </div>
                <div className="footer_opening_hours">
                <p>
                GenAI & ML 
                </p>
                <p>
                  Cloud
                </p>
                <p>
                  Data
                </p>
                <p>
                  Security
                </p>
              </div>
                <div className="social_box">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <i className="fa-brands fa-twitter" aria-hidden="true"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="footer_opening_hours">
                <h5>Company</h5>
                <p><Link className="nav-link" to="/about" ><span>About</span></Link> </p>
                <p><Link className="nav-link" to="/about#careers"><span>Careers</span></Link></p>
                <p><Link className="nav-link" to="/case-studies" ><span>Case Studies</span></Link> </p>
                <p><Link className="nav-link" to="/contact" ><span>Contact Us</span></Link> </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_bottom">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} Monk Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 