import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitterSquare, faInstagramSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './footer.css'; 

const Footer = () => {
  return (
    <footer id="footer" className="footer" style={{ backgroundColor: '#B87333', color: 'white', padding: '20px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.facebook.com/rachael.njoki.12" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebookSquare} /> <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="https://x.com/NjokiRaychael" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitterSquare} /> <span>X</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/your-instagram-page" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagramSquare} /> <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/rachael-njoki-66b9b8115/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} /> <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Address</h5>
            <address>
              123 Hotel Road, <br />
              Suite 101, <br />
              City, Country <br />
              Zip Code: 12345
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
