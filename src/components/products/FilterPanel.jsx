import { useEffect, useRef, useState } from 'react';
import './FilterPanel.css';

function FilterPanel({ filters, options, onFilterChange, onClear }) {
  const resolvedMaxPrice = filters.maxPrice ?? options.maxPrice;
  const [draftMaxPrice, setDraftMaxPrice] = useState(resolvedMaxPrice);
  const lastCommittedPrice = useRef(resolvedMaxPrice);

  useEffect(() => {
    const nextValue = filters.maxPrice ?? options.maxPrice;
    setDraftMaxPrice(nextValue);
    lastCommittedPrice.current = nextValue;
  }, [filters.maxPrice, options.maxPrice]);

  const commitMaxPrice = (value) => {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return;
    }

    if (numericValue === lastCommittedPrice.current) {
      return;
    }

    lastCommittedPrice.current = numericValue;

    if (numericValue >= options.maxPrice) {
      onFilterChange('maxPrice', '');
      return;
    }

    onFilterChange('maxPrice', numericValue);
  };

  const resetPrice = () => {
    setDraftMaxPrice(options.maxPrice);
    lastCommittedPrice.current = options.maxPrice;
    onFilterChange('maxPrice', '');
  };

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
          <span>Up to Rs.{draftMaxPrice.toLocaleString('en-US')}</span>
        </label>
        <input
          id="max-price"
          type="range"
          min={options.minPrice}
          max={options.maxPrice}
          step="500"
          value={draftMaxPrice}
          onChange={(event) => setDraftMaxPrice(Number(event.target.value))}
          onPointerUp={(event) => commitMaxPrice(event.currentTarget.value)}
          onKeyUp={(event) => commitMaxPrice(event.currentTarget.value)}
          onBlur={(event) => commitMaxPrice(event.currentTarget.value)}
        />
        <button
          className="filter-panel__price-reset"
          type="button"
          onClick={resetPrice}
        >
          Reset price
        </button>
      </div>
    </aside>
  );
}

export default FilterPanel;
