import { useEffect, useRef, useState } from 'react';
import './FilterPanel.css';

function FilterPanel({
  filters,
  options,
  onFilterChange,
  onClear,
  onResetPrice,
}) {
  const resolvedMinPrice = filters.minPrice ?? options.minPrice;
  const resolvedMaxPrice = filters.maxPrice ?? options.maxPrice;

  const [draftMinPrice, setDraftMinPrice] = useState(resolvedMinPrice);
  const [draftMaxPrice, setDraftMaxPrice] = useState(resolvedMaxPrice);

  const lastCommittedMinPrice = useRef(resolvedMinPrice);
  const lastCommittedMaxPrice = useRef(resolvedMaxPrice);

  useEffect(() => {
    const nextMinPrice = filters.minPrice ?? options.minPrice;
    const nextMaxPrice = filters.maxPrice ?? options.maxPrice;

    setDraftMinPrice(nextMinPrice);
    setDraftMaxPrice(nextMaxPrice);

    lastCommittedMinPrice.current = nextMinPrice;
    lastCommittedMaxPrice.current = nextMaxPrice;
  }, [filters.minPrice, filters.maxPrice, options.minPrice, options.maxPrice]);

  const commitMinPrice = (value) => {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return;
    }

    const boundedValue = Math.min(
      Math.max(numericValue, options.minPrice),
      draftMaxPrice,
    );

    setDraftMinPrice(boundedValue);

    if (boundedValue === lastCommittedMinPrice.current) {
      return;
    }

    lastCommittedMinPrice.current = boundedValue;

    if (boundedValue <= options.minPrice) {
      onFilterChange('minPrice', '');
      return;
    }

    onFilterChange('minPrice', boundedValue);
  };

  const commitMaxPrice = (value) => {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return;
    }

    const boundedValue = Math.max(
      Math.min(numericValue, options.maxPrice),
      draftMinPrice,
    );

    setDraftMaxPrice(boundedValue);

    if (boundedValue === lastCommittedMaxPrice.current) {
      return;
    }

    lastCommittedMaxPrice.current = boundedValue;

    if (boundedValue >= options.maxPrice) {
      onFilterChange('maxPrice', '');
      return;
    }

    onFilterChange('maxPrice', boundedValue);
  };

  const resetPrice = () => {
    setDraftMinPrice(options.minPrice);
    setDraftMaxPrice(options.maxPrice);

    lastCommittedMinPrice.current = options.minPrice;
    lastCommittedMaxPrice.current = options.maxPrice;

    onResetPrice();
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
        <label htmlFor="min-price">
          Minimum price
          <span>From Rs.{draftMinPrice.toLocaleString('en-US')}</span>
        </label>

        <input
          id="min-price"
          type="range"
          min={options.minPrice}
          max={draftMaxPrice}
          step="500"
          value={draftMinPrice}
          onChange={(event) => setDraftMinPrice(Number(event.target.value))}
          onPointerUp={(event) => commitMinPrice(event.currentTarget.value)}
          onKeyUp={(event) => commitMinPrice(event.currentTarget.value)}
          onBlur={(event) => commitMinPrice(event.currentTarget.value)}
        />

        <label htmlFor="max-price">
          Maximum price
          <span>Up to Rs.{draftMaxPrice.toLocaleString('en-US')}</span>
        </label>

        <input
          id="max-price"
          type="range"
          min={draftMinPrice}
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
