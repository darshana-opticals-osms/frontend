import {
  getCatalogOptions,
  getProductById,
  getProducts,
} from '../src/services/productService';

describe('productService', () => {
  it('returns all catalog products when no filters are supplied', async () => {
    const products = await getProducts();

    expect(products.length).toBeGreaterThan(0);
  });

  it('filters by category', async () => {
    const products = await getProducts({ category: 'Men' });

    expect(products.length).toBeGreaterThan(0);
    expect(products.every((product) => product.category === 'Men')).toBe(true);
  });

  it('filters by brand', async () => {
    const products = await getProducts({ brand: 'Oliver Peoples' });

    expect(products.length).toBeGreaterThan(0);
    expect(
      products.every((product) => product.brand === 'Oliver Peoples'),
    ).toBe(true);
  });

  it('filters by search text', async () => {
    const products = await getProducts({ search: 'coastal' });

    expect(products).toHaveLength(1);
    expect(products[0].name).toBe('Coastal Pilot');
  });

  it('filters by maximum price without treating an empty value as zero', async () => {
    const allProducts = await getProducts({ maxPrice: '' });
    const cheaperProducts = await getProducts({ maxPrice: 13000 });

    expect(allProducts.length).toBeGreaterThan(cheaperProducts.length);
    expect(cheaperProducts.every((product) => product.price <= 13000)).toBe(
      true,
    );
  });

  it('supports combined filters', async () => {
    const products = await getProducts({
      category: 'Women',
      brand: 'Warby Parker',
      maxPrice: 13000,
    });

    expect(products).toHaveLength(1);
    expect(products[0].name).toBe('Meridian Slim');
  });

  it('returns a product by id and null for an unknown id', async () => {
    const product = await getProductById('austen-classic');
    const missing = await getProductById('missing-product');

    expect(product?.name).toBe('Austen Classic');
    expect(missing).toBeNull();
  });

  it('exposes the approved category options', () => {
    const options = getCatalogOptions();

    expect(options.categories).toEqual(['Men', 'Women', 'Kids', 'Sunglasses']);
    expect(options.brands.length).toBeGreaterThan(0);
  });
});
