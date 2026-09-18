import './SearchBar.css';

function SearchBar({
  value,
  onChange,
  onSubmit,
  compact = false,
  label = 'Search frames',
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form
      className={`product-search${compact ? ' product-search--compact' : ''}`}
      role="search"
      onSubmit={handleSubmit}
    >
      <label className="product-search__label" htmlFor="catalog-search">
        {label}
      </label>
      <div className="product-search__control">
        <span className="product-search__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" focusable="false">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4 4" />
          </svg>
        </span>
        <input
          id="catalog-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search frames..."
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

export default SearchBar;
