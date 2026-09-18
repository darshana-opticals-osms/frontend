import products from '../data/products';

function toFiniteNumberOrNull(value) {
  if (value === '' || value === null || value === undefined) {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export function getCatalogOptions() {
  const prices = products.map((product) => product.price);

  return {
    categories: ['Men', 'Women', 'Kids', 'Sunglasses'],
    brands: uniqueSorted(products.map((product) => product.brand)),
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
  };
}

export async function getProducts(filters = {}) {
  const search = String(filters.search || '')
    .trim()
    .toLowerCase();
  const category = String(filters.category || '').trim();
  const brand = String(filters.brand || '').trim();
  const maxPrice = toFiniteNumberOrNull(filters.maxPrice);

  return products.filter((product) => {
    const matchesSearch =
      !search ||
      [product.name, product.brand, product.category].some((value) =>
        value.toLowerCase().includes(search),
      );
    const matchesCategory = !category || product.category === category;
    const matchesBrand = !brand || product.brand === brand;
    const matchesPrice = maxPrice === null || product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });
}

export async function getProductById(id) {
  return products.find((product) => product.id === id) || null;
}
