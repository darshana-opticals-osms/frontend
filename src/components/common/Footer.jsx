import { Link } from 'react-router-dom';
import logo from '../../assets/darshana-logo.jpg';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <section className="footer__brand" aria-label="Darshana Opticals">
          <div className="footer__brand-lockup">
            <img
              src={logo}
              alt=""
              className="footer__brand-logo"
              aria-hidden="true"
            />
            <div>
              <p className="footer__brand-name">Darshana Opticals</p>
              <p className="footer__brand-tagline">Eyewear Studio</p>
            </div>
          </div>

          <p className="footer__brand-copy">
            Premium eyewear designed for clarity, comfort, and style.
          </p>
        </section>

        <section>
          <h2>Collections</h2>
          <ul>
            <li>
              <Link to="/products?category=Men">Men&apos;s Frames</Link>
            </li>
            <li>
              <Link to="/products?category=Women">Women&apos;s Frames</Link>
            </li>
            <li>
              <Link to="/products?category=Kids">Kids&apos; Frames</Link>
            </li>
            <li>
              <Link to="/products?category=Sunglasses">Sunglasses</Link>
            </li>
          </ul>
        </section>

        <section>
          <h2>Services</h2>
          <ul className="footer__plain-list">
            <li>Free Eye Test</li>
            <li>Home Try-On</li>
            <li>Lens Replacement</li>
            <li>Frame Repairs</li>
            <li>Prescription Upload</li>
          </ul>
        </section>

        <section>
          <h2>Contact</h2>
          <address>
            <p>No 50, Airport Road, Minuwangoda</p>
            <p>Branches: Gampaha, Weyangoda</p>
            <p>
              <a href="tel:+94777587695">+94 777 587 695</a>
            </p>
            <p>
              <a href="mailto:darshanaopticals@gmail.com">
                darshanaopticals@gmail.com
              </a>
            </p>
          </address>
        </section>
      </div>

      <div className="footer__bottom">
        <p>
          &copy; {year} Darshana Opticals Eyewear Studio. All rights reserved.
        </p>
        <div className="footer__policies" aria-label="Legal information">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
