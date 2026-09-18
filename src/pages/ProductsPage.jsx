import ProductCard from '../components/products/ProductCard';
import FilterPanel from '../components/products/FilterPanel';
import EmptyState from '../components/products/EmptyState';
import LoadingState from '../components/products/LoadingState';
import useProductCatalog from '../hooks/useProductCatalog';
import './ProductsPage.css';

function ProductsPage() {
  const {
    products,
    loading,
    error,
    filters,
    options,
    updateFilter,
    clearFilters,
  } = useProductCatalog();

  const title =
    filters.category || (filters.search ? 'Search results' : 'Eyewear');

  return (
    <section className="catalog-page">
      <header className="catalog-page__heading">
        <div>
          <p className="catalog-page__eyebrow">Darshana Opticals Collection</p>
          <h1>{title}</h1>
          <p>
            {loading
              ? 'Loading styles...'
              : `${products.length} ${products.length === 1 ? 'style' : 'styles'} available`}
          </p>
        </div>

        {filters.search ? (
          <div className="catalog-page__search-summary">
            Search: <strong>{filters.search}</strong>
            <button type="button" onClick={() => updateFilter('q', '')}>
              Clear search
            </button>
          </div>
        ) : null}
      </header>

      <div className="catalog-page__content">
        <FilterPanel
          filters={filters}
          options={options}
          onFilterChange={updateFilter}
          onClear={clearFilters}
        />

        <div className="catalog-page__results">
          {error ? (
            <p className="catalog-page__error" role="alert">
              {error}
            </p>
          ) : null}

          {loading ? <LoadingState /> : null}

          {!loading && !error && products.length === 0 ? (
            <EmptyState onClear={clearFilters} />
          ) : null}

          {!loading && !error && products.length > 0 ? (
            <div className="catalog-page__grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;
