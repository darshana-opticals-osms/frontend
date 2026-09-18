import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import ProductsPage from '../src/pages/ProductsPage';
import ProductDetailPage from '../src/pages/ProductDetailPage';

function LocationProbe() {
  const location = useLocation();
  return (
    <output data-testid="location">{`${location.pathname}${location.search}`}</output>
  );
}

function renderCatalog(initialEntry = '/products') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <LocationProbe />
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProductsPage', () => {
  it('shows the loading state and then the catalog', async () => {
    renderCatalog();

    expect(screen.getByText('Loading products...')).toBeInTheDocument();
    expect(await screen.findByText('Austen Classic')).toBeInTheDocument();
  });

  it('restores category state from a direct URL', async () => {
    renderCatalog('/products?category=Men');

    expect(screen.getByRole('heading', { name: 'Men' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Men' })).toBeChecked();
    expect(await screen.findByText('Austen Classic')).toBeInTheDocument();
    expect(screen.queryByText('Meridian Slim')).not.toBeInTheDocument();
  });

  it('updates the URL when the category changes', async () => {
    const user = userEvent.setup();
    renderCatalog();

    await user.click(screen.getByRole('radio', { name: 'Women' }));

    await waitFor(() => {
      expect(screen.getByTestId('location')).toHaveTextContent(
        '/products?category=Women',
      );
    });
    expect(await screen.findByText('Meridian Slim')).toBeInTheDocument();
  });

  it('filters by a brand selected in the URL', async () => {
    renderCatalog('/products?brand=Oakley');

    expect(screen.getByRole('radio', { name: 'Oakley' })).toBeChecked();
    expect(await screen.findByText('Blue Shield')).toBeInTheDocument();
    expect(screen.queryByText('Austen Classic')).not.toBeInTheDocument();
  });

  it('filters by maximum price', async () => {
    renderCatalog('/products?maxPrice=13000');

    expect(await screen.findByText('Austen Classic')).toBeInTheDocument();
    expect(screen.getByText('Meridian Slim')).toBeInTheDocument();
    expect(screen.queryByText('Blue Shield')).not.toBeInTheDocument();
  });

  it('supports search from the query string', async () => {
    renderCatalog('/products?q=coastal');

    expect(await screen.findByText('Coastal Pilot')).toBeInTheDocument();
    expect(screen.queryByText('Austen Classic')).not.toBeInTheDocument();
  });

  it('supports combined filters', async () => {
    renderCatalog('/products?category=Women&brand=Warby+Parker&maxPrice=13000');

    expect(await screen.findByText('Meridian Slim')).toBeInTheDocument();
    expect(screen.queryByText('Cleo Cat-Eye')).not.toBeInTheDocument();
  });

  it('shows a no-results state', async () => {
    renderCatalog('/products?q=no-such-frame');

    expect(await screen.findByText('No products found')).toBeInTheDocument();
  });

  it('does not crash on invalid query values', async () => {
    renderCatalog('/products?category=Unknown&maxPrice=not-a-number');

    expect(
      screen.getByRole('heading', { name: 'Eyewear' }),
    ).toBeInTheDocument();
    expect(await screen.findByText('Austen Classic')).toBeInTheDocument();
  });

  it('navigates from a product card to product details', async () => {
    const user = userEvent.setup();
    renderCatalog('/products?category=Men');

    const link = await screen.findByRole('link', {
      name: 'View Austen Classic',
    });
    await user.click(link);

    expect(
      await screen.findByRole('heading', { name: 'Austen Classic' }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent(
      '/products/austen-classic',
    );
  });
});
