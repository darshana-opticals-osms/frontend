import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCatalogOptions, getProducts } from '../services/productService';

function readFilters(searchKey, options) {
  const params = new URLSearchParams(searchKey);
  const category = params.get('category') || '';
  const brand = params.get('brand') || '';
  const maxPriceValue = params.get('maxPrice');
  const maxPriceNumber =
    maxPriceValue === null || maxPriceValue === ''
      ? null
      : Number(maxPriceValue);

  return {
    search: params.get('q') || '',
    category: options.categories.includes(category) ? category : '',
    brand: options.brands.includes(brand) ? brand : '',
    maxPrice: Number.isFinite(maxPriceNumber) ? maxPriceNumber : null,
  };
}

function useProductCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.toString();
  const options = useMemo(() => getCatalogOptions(), []);
  const filters = useMemo(
    () => readFilters(searchKey, options),
    [searchKey, options],
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError('');

    getProducts(filters)
      .then((result) => {
        if (active) {
          setProducts(result);
        }
      })
      .catch(() => {
        if (active) {
          setProducts([]);
          setError('We could not load the catalog. Please try again.');
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [filters]);

  const updateFilter = (name, value) => {
    const next = new URLSearchParams(searchKey);

    if (value === '' || value === null || value === undefined) {
      next.delete(name);
    } else {
      next.set(name, String(value));
    }

    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return {
    products,
    loading,
    error,
    filters,
    options,
    updateFilter,
    clearFilters,
  };
}

export default useProductCatalog;
