import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../src/routes/ProtectedRoute';
import useAuth from '../src/hooks/useAuth';

vi.mock('../src/hooks/useAuth');

function renderProtectedRoute(initialRoute = '/protected') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/login" element={<h1>Login page</h1>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/protected" element={<h1>Protected content</h1>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    useAuth.mockReset();
  });

  it('redirects an unauthenticated user to the login page', () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
    });

    renderProtectedRoute();

    expect(
      screen.getByRole('heading', { name: /login page/i }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: /protected content/i }),
    ).not.toBeInTheDocument();
  });

  it('allows an authenticated user to access protected content', () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
    });

    renderProtectedRoute();

    expect(
      screen.getByRole('heading', { name: /protected content/i }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: /login page/i }),
    ).not.toBeInTheDocument();
  });
});
