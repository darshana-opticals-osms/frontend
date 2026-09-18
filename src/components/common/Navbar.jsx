import { Link } from 'react-router-dom';
import './Navbar.css';

// Placeholder navigation bar for the OSMS application shell.
// Real navigation links will be added as features are implemented.
function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <p className="navbar__brand">Darshana Opticals</p>
      <ul className="navbar__links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
