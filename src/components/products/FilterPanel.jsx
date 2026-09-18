import './FilterPanel.css';

function FilterPanel({ filters, options, onFilterChange, onClear }) {
  return (
    <aside className="filter-panel" aria-label="Product filters">
      <div className="filter-panel__header">
        <h2>Filters</h2>
        <button type="button" onClick={onClear}>
          Clear all
        </button>
      </div>

      <fieldset>
        <legend>Category</legend>
        <label>
          <input
            type="radio"
            name="category"
            value=""
            checked={!filters.category}
            onChange={() => onFilterChange('category', '')}
          />
          All
        </label>
        {options.categories.map((category) => (
          <label key={category}>
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={() => onFilterChange('category', category)}
            />
            {category}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Brand</legend>
        <label>
          <input
            type="radio"
            name="brand"
            value=""
            checked={!filters.brand}
            onChange={() => onFilterChange('brand', '')}
          />
          All brands
        </label>
        {options.brands.map((brand) => (
          <label key={brand}>
            <input
              type="radio"
              name="brand"
              value={brand}
              checked={filters.brand === brand}
              onChange={() => onFilterChange('brand', brand)}
            />
            {brand}
          </label>
        ))}
      </fieldset>

      <div className="filter-panel__price">
        <label htmlFor="max-price">
          Maximum price
          <span>
            {filters.maxPrice === null
              ? `Up to Rs.${options.maxPrice.toLocaleString('en-US')}`
              : `Up to Rs.${filters.maxPrice.toLocaleString('en-US')}`}
          </span>
        </label>
        <input
          id="max-price"
          type="range"
          min={options.minPrice}
          max={options.maxPrice}
          step="500"
          value={filters.maxPrice ?? options.maxPrice}
          onChange={(event) =>
            onFilterChange('maxPrice', Number(event.target.value))
          }
        />
        <button
          className="filter-panel__price-reset"
          type="button"
          onClick={() => onFilterChange('maxPrice', '')}
        >
          Reset price
        </button>
      </div>
    </aside>
  );
}

export default FilterPanel;
