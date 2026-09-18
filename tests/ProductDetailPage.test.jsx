import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetailPage from '../src/pages/ProductDetailPage';

function renderDetail(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProductDetailPage', () => {
  it('renders the selected product details', async () => {
    renderDetail('/products/austen-classic');

    expect(
      await screen.findByRole('heading', { name: 'Austen Classic' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Oliver Peoples')).toHaveLength(2);
    expect(screen.getByText('Rs.12,500')).toBeInTheDocument();
    expect(
      screen.getByAltText(
        'Black semi-rim rectangular optical frame on a white background',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Back to products' }),
    ).toHaveAttribute('href', '/products');
  });

  it('handles an unknown product id locally', async () => {
    renderDetail('/products/not-real');

    expect(
      await screen.findByRole('heading', { name: 'Product not found' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Back to products' }),
    ).toHaveAttribute('href', '/products');
  });
});
