import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../src/components/products/ProductCard';

const product = {
  id: 'test-frame',
  name: 'Test Frame',
  brand: 'Test Brand',
  category: 'Men',
  price: 12500,
  originalPrice: 14900,
  imageUrl: '/test-frame.jpg',
  imageAlt: 'Black rectangular test frame',
  frameType: 'Full Rim',
};

function renderCard() {
  return render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>,
  );
}

describe('ProductCard', () => {
  it('renders core product information and meaningful alt text', () => {
    renderCard();

    expect(screen.getByText('Test Frame')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('Rs.12,500')).toBeInTheDocument();
    expect(
      screen.getByAltText('Black rectangular test frame'),
    ).toBeInTheDocument();
  });

  it('links to the product detail route', () => {
    renderCard();

    expect(
      screen.getByRole('link', { name: 'View Test Frame' }),
    ).toHaveAttribute('href', '/products/test-frame');
  });

  it('is keyboard accessible', async () => {
    const user = userEvent.setup();
    renderCard();

    await user.tab();

    expect(screen.getByRole('link', { name: 'View Test Frame' })).toHaveFocus();
  });
});
