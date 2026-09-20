import { beforeEach, describe, expect, it, vi } from 'vitest';
import apiClient from '../src/services/apiClient';
import {
  CATALOG_CATEGORIES,
  getCatalogOptions,
  getProductById,
  getProducts,
} from '../src/services/productService';

vi.mock('../src/services/apiClient', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('productService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads products from the backend API and normalizes the response', async () => {
    apiClient.get.mockResolvedValueOnce({
      success: true,
      data: [
        {
          id: 'product-1',
          itemName: 'Austen Classic',
          category: 'Men',
          brand: 'Oliver Peoples',
          price: 12500,
        },
      ],
    });

    const products = await getProducts();

    expect(apiClient.get).toHaveBeenCalledWith('/products', {
      authenticated: false,
    });

    expect(products).toEqual([
      {
        id: 'product-1',
        name: 'Austen Classic',
        category: 'Men',
        brand: 'Oliver Peoples',
        price: 12500,
      },
    ]);
  });

  it('sends search and filter values as backend query parameters', async () => {
    apiClient.get.mockResolvedValueOnce({
      success: true,
      data: [],
    });

    await getProducts({
      search: 'pilot',
      category: 'Men',
      brand: 'Ray-Ban',
      minPrice: 5000,
      maxPrice: 15000,
    });

    expect(apiClient.get).toHaveBeenCalledWith(
      '/products?search=pilot&category=Men&brand=Ray-Ban&minPrice=5000&maxPrice=15000',
      {
        authenticated: false,
      },
    );
  });

  it('does not send empty filter values', async () => {
    apiClient.get.mockResolvedValueOnce({
      success: true,
      data: [],
    });

    await getProducts({
      search: ' ',
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
    });

    expect(apiClient.get).toHaveBeenCalledWith('/products', {
      authenticated: false,
    });
  });

  it('returns an empty array when the backend response has no product array', async () => {
    apiClient.get.mockResolvedValueOnce({
      success: true,
      data: null,
    });

    await expect(getProducts()).resolves.toEqual([]);
  });

  it('builds catalog filter options from backend product data', async () => {
    apiClient.get.mockResolvedValueOnce({
      success: true,
      data: [
        {
          id: 'product-1',
          itemName: 'Austen Classic',
          category: 'Men',
          brand: 'Oliver Peoples',
          price: 12500,
        },
        {
          id: 'product-2',
          itemName: 'Coastal Pilot',
          category: 'Sunglasses',
          brand: 'Ray-Ban',
          price: 18000,
        },
        {
          id: 'product-3',
          itemName: 'Junior Flex',
          category: 'Kids',
          brand: 'Oliver Peoples',
          price: 8990,
        },
      ],
    });

    const options = await getCatalogOptions();

    expect(options).toEqual({
      categories: CATALOG_CATEGORIES,
      brands: ['Oliver Peoples', 'Ray-Ban'],
      minPrice: 8990,
      maxPrice: 18000,
    });
  });

  it('returns safe catalog options when the backend catalog is empty', async () => {
    apiClient.get.mockResolvedValueOnce({
      success: true,
      data: [],
    });

    const options = await getCatalogOptions();

    expect(options).toEqual({
      categories: CATALOG_CATEGORIES,
      brands: [],
      minPrice: 0,
      maxPrice: 0,
    });
  });

  it('loads and normalizes one product by id', async () => {
    apiClient.get.mockResolvedValueOnce({
      success: true,
      data: {
        id: 'product-1',
        itemName: 'Austen Classic',
        category: 'Men',
        brand: 'Oliver Peoples',
        price: 12500,
      },
    });

    const product = await getProductById('product-1');

    expect(apiClient.get).toHaveBeenCalledWith('/products/product-1', {
      authenticated: false,
    });

    expect(product).toEqual({
      id: 'product-1',
      name: 'Austen Classic',
      category: 'Men',
      brand: 'Oliver Peoples',
      price: 12500,
    });
  });

  it('returns null when the product does not exist', async () => {
    const error = new Error('Product not found.');
    error.status = 404;

    apiClient.get.mockRejectedValueOnce(error);

    await expect(getProductById('missing-product')).resolves.toBeNull();
  });

  it('rethrows non-404 backend errors', async () => {
    const error = new Error('Server unavailable.');
    error.status = 500;

    apiClient.get.mockRejectedValueOnce(error);

    await expect(getProductById('product-1')).rejects.toThrow(
      'Server unavailable.',
    );
  });
});
