import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/darshana-logo.jpg';
import SearchBar from '../products/SearchBar';
import './Navbar.css';

const categoryLinks = ['Men', 'Women', 'Kids', 'Sunglasses'];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentParams = new URLSearchParams(location.search);
  const currentSearch = location.pathname.startsWith('/products')
    ? currentParams.get('q') || ''
    : '';
  const [query, setQuery] = useState(currentSearch);

  useEffect(() => {
    setQuery(currentSearch);
  }, [currentSearch]);

  const handleSearch = (value) => {
    const next = new URLSearchParams(
      location.pathname.startsWith('/products') ? location.search : '',
    );
    const cleanValue = value.trim();

    if (cleanValue) {
      next.set('q', cleanValue);
    } else {
      next.delete('q');
    }

    navigate({
      pathname: '/products',
      search: next.toString() ? `?${next.toString()}` : '',
    });
  };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link
          className="navbar__brand"
          to="/"
          aria-label="Darshana Opticals home"
        >
          <img
            src={logo}
            alt=""
            className="navbar__brand-logo"
            aria-hidden="true"
          />
          <span className="navbar__brand-copy">
            <span className="navbar__brand-name">Darshana Opticals</span>
            <span className="navbar__brand-tagline">Eyewear Studio</span>
          </span>
        </Link>

        <ul className="navbar__categories">
          {categoryLinks.map((category) => (
            <li key={category}>
              <Link
                to={`/products?category=${encodeURIComponent(category)}`}
                className="navbar__category-link"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar__search">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
            compact
          />
        </div>

        <ul className="navbar__account-links">
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link className="navbar__signup-link" to="/signup">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
