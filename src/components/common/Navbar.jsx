import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <p className="navbar__brand">Darshana Opticals</p>

      <ul className="navbar__links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {isAuthenticated ? (
          <li>
            <button
              type="button"
              className="navbar__logout-button"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Log In</Link>
            </li>

            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
