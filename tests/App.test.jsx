import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';

function renderAppAt(initialRoute) {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>,
  );
}

describe('Application shell', () => {
  it('renders the navbar, main content area, and footer', () => {
    renderAppAt('/');

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

describe('Routing', () => {
  it('renders the HomePage on the "/" route', () => {
    renderAppAt('/');

    expect(
      screen.getByRole('heading', { name: /darshana opticals/i }),
    ).toBeInTheDocument();
  });

  it('renders the NotFoundPage for an unknown route', () => {
    renderAppAt('/some/unknown/route');

    expect(
      screen.getByRole('heading', { name: /page not found/i }),
    ).toBeInTheDocument();
  });

  it('renders the SignupPage on the "/signup" route', () => {
    renderAppAt('/signup');

    expect(
      screen.getByRole('heading', { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it('renders the LoginPage on the "/login" route', () => {
    renderAppAt('/login');

    expect(
      screen.getByRole('heading', { name: /welcome back/i }),
    ).toBeInTheDocument();
  });
});
