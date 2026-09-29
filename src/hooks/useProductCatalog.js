import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  buildCatalogOptions,
  CATALOG_CATEGORIES,
  getProducts,
} from '../services/productService';

const INITIAL_OPTIONS = {
  categories: CATALOG_CATEGORIES,
  brands: [],
  minPrice: 0,
  maxPrice: 0,
};

function toValidPrice(value) {
  if (value === null || value === '') {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) && number >= 0 ? number : null;
}

function readFilters(searchKey) {
  const params = new URLSearchParams(searchKey);

  const category = params.get('category') || '';

  return {
    search: params.get('q') || '',
    category: CATALOG_CATEGORIES.includes(category) ? category : '',
    brand: params.get('brand') || '',
    minPrice: toValidPrice(params.get('minPrice')),
    maxPrice: toValidPrice(params.get('maxPrice')),
  };
}

function hasActiveFilters(filters) {
  return Boolean(
    filters.search ||
    filters.category ||
    filters.brand ||
    filters.minPrice !== null ||
    filters.maxPrice !== null,
  );
}

function useProductCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.toString();

  const filters = useMemo(() => readFilters(searchKey), [searchKey]);

  const [products, setProducts] = useState([]);
  const [options, setOptions] = useState(INITIAL_OPTIONS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const optionsInitialized = useRef(false);

  useEffect(() => {
    let active = true;

    const loadCatalog = async () => {
      setLoading(true);
      setError('');

      try {
        if (!optionsInitialized.current) {
          const allProducts = await getProducts();

          if (!active) {
            return;
          }

          setOptions(buildCatalogOptions(allProducts));
          optionsInitialized.current = true;

          if (!hasActiveFilters(filters)) {
            setProducts(allProducts);
            return;
          }
        }

        const result = await getProducts(filters);

        if (active) {
          setProducts(result);
        }
      } catch {
        if (active) {
          setProducts([]);
          setError('We could not load the catalog. Please try again.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadCatalog();

    return () => {
      active = false;
    };
  }, [filters]);

  const updateFilter = (name, value) => {
    setSearchParams((currentParams) => {
      const next = new URLSearchParams(currentParams);

      if (value === '' || value === null || value === undefined) {
        next.delete(name);
      } else {
        next.set(name, String(value));
      }

      return next;
    });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const clearPriceFilters = () => {
    setSearchParams((currentParams) => {
      const next = new URLSearchParams(currentParams);

      next.delete('minPrice');
      next.delete('maxPrice');

      return next;
    });
  };

  return {
    products,
    loading,
    error,
    filters,
    options,
    updateFilter,
    clearFilters,
    clearPriceFilters,
  };
}

export default useProductCatalog;
