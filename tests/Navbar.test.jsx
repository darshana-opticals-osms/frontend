import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../src/components/common/Navbar';
import useAuth from '../src/hooks/useAuth';

vi.mock('../src/hooks/useAuth');

function renderNavbar() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/login" element={<h1>Login destination</h1>} />
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
});
