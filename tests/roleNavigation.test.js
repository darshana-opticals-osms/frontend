import { createElement } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  BRANCH_MANAGER,
  CUSTOMER,
  INVENTORY_MANAGER,
  MANAGEMENT,
  OPTOMETRIST,
  SALES_ASSISTANT_CASHIER,
  SYSTEM_ADMIN,
  isCanonicalRole,
} from '../src/config/roles';
import { getPostLoginRoute } from '../src/routes/roleNavigation';

const canonicalRoles = [
  CUSTOMER,
  SYSTEM_ADMIN,
  INVENTORY_MANAGER,
  BRANCH_MANAGER,
  OPTOMETRIST,
  MANAGEMENT,
  SALES_ASSISTANT_CASHIER,
];

describe('canonical roles', () => {
  it.each(canonicalRoles)('accepts %s', (role) => {
    expect(isCanonicalRole(role)).toBe(true);
  });

  it.each([undefined, null, '', 'customer', 'ADMIN', 1, {}])(
    'rejects non-canonical role %s',
    (role) => {
      expect(isCanonicalRole(role)).toBe(false);
    },
  );
});

describe('post-login routing', () => {
  it.each(canonicalRoles)('safely falls back to Home for %s', (role) => {
    expect(getPostLoginRoute(role)).toBe('/');
  });

  it.each([undefined, null, '', 'optometrist', 'ADMIN'])(
    'safely falls back for missing or unknown role %s',
    (role) => {
      expect(getPostLoginRoute(role)).toBe('/');
    },
  );

  it.each([
    'https://attacker.example',
    '//attacker.example/path',
    '/\\attacker.example/path',
    'javascript:alert(1)',
    'clinical',
    42,
  ])('rejects unsafe destination %s', (destination) => {
    expect(getPostLoginRoute(OPTOMETRIST, { [OPTOMETRIST]: destination })).toBe(
      '/',
    );
  });

  it('uses a configured internal destination when its test-only route exists', () => {
    const futureDestinations = { [OPTOMETRIST]: '/clinical' };
    const postLoginRoute = getPostLoginRoute(OPTOMETRIST, futureDestinations);

    render(
      createElement(
        MemoryRouter,
        { initialEntries: ['/login-success'] },
        createElement(
          Routes,
          null,
          createElement(Route, {
            path: '/login-success',
            element: createElement(Navigate, {
              to: postLoginRoute,
              replace: true,
            }),
          }),
          createElement(Route, {
            path: '/clinical',
            element: createElement('h1', null, 'Clinical test route'),
          }),
        ),
      ),
    );

    expect(
      screen.getByRole('heading', { name: /clinical test route/i }),
    ).toBeInTheDocument();
  });
});
