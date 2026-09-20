import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../src/components/common/Navbar';
import useAuth from '../src/hooks/useAuth';

vi.mock('../src/hooks/useAuth');

function renderNavbar(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/login" element={<h1>Login destination</h1>} />
        <Route
          path="/products"
          element={
            <>
              <Navbar />
              <h1>Products destination</h1>
            </>
          }
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Navbar authentication controls', () => {
  beforeEach(() => {
    useAuth.mockReset();
  });

  it('shows login and signup links when the user is unauthenticated', () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      logout: vi.fn(),
    });

    renderNavbar();

    expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /log out/i }),
    ).not.toBeInTheDocument();
  });

  it('shows logout instead of login and signup when authenticated', () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      logout: vi.fn(),
    });

    renderNavbar();

    expect(
      screen.getByRole('button', { name: /log out/i }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: /log in/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: /sign up/i }),
    ).not.toBeInTheDocument();
  });

  it('logs the user out and redirects to the login page', async () => {
    const logout = vi.fn();

    useAuth.mockReturnValue({
      isAuthenticated: true,
      logout,
    });

    const user = userEvent.setup();

    renderNavbar();

    await user.click(screen.getByRole('button', { name: /log out/i }));

    expect(logout).toHaveBeenCalledTimes(1);

    expect(
      await screen.findByRole('heading', {
        name: /login destination/i,
      }),
    ).toBeInTheDocument();
  });

  it('navigates to the product catalog when a search is submitted', async () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      logout: vi.fn(),
    });

    const user = userEvent.setup();

    renderNavbar();

    const searchInput = screen.getByRole('searchbox', {
      name: /search frames/i,
    });

    await user.type(searchInput, 'pilot');
    await user.keyboard('{Enter}');

    expect(
      await screen.findByRole('heading', {
        name: /products destination/i,
      }),
    ).toBeInTheDocument();
  });

  it('clears an existing product search when an empty search is submitted', async () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      logout: vi.fn(),
    });

    const user = userEvent.setup();

    renderNavbar('/products?q=pilot');

    const searchInput = screen.getByRole('searchbox', {
      name: /search frames/i,
    });

    expect(searchInput).toHaveValue('pilot');

    await user.clear(searchInput);
    await user.keyboard('{Enter}');

    expect(searchInput).toHaveValue('');

    expect(
      await screen.findByRole('heading', {
        name: /products destination/i,
      }),
    ).toBeInTheDocument();
  });
});
