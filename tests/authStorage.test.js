import authStorage from '../src/services/auth/authStorage';

describe('authStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('stores the authentication token and user information', () => {
    const token = 'test-jwt-token';

    const user = {
      id: 'customer-1',
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'CUSTOMER',
    };

    authStorage.saveAuth(token, user);

    expect(authStorage.getToken()).toBe(token);
    expect(authStorage.getUser()).toEqual(user);
  });

  it('does not save authentication data when token is missing', () => {
    authStorage.saveAuth(null, {
      id: 'customer-1',
      name: 'Jane Doe',
    });

    expect(authStorage.getToken()).toBeNull();
    expect(authStorage.getUser()).toBeNull();
  });

  it('does not save authentication data when user is missing', () => {
    authStorage.saveAuth('test-jwt-token', null);

    expect(authStorage.getToken()).toBeNull();
    expect(authStorage.getUser()).toBeNull();
  });

  it('clears the token and user information during logout', () => {
    authStorage.saveAuth('test-jwt-token', {
      id: 'customer-1',
      name: 'Jane Doe',
      role: 'CUSTOMER',
    });

    authStorage.clearAuth();

    expect(authStorage.getToken()).toBeNull();
    expect(authStorage.getUser()).toBeNull();
  });

  it('removes corrupted stored user data instead of crashing', () => {
    localStorage.setItem('osms.auth.user', 'invalid-json');

    expect(authStorage.getUser()).toBeNull();
    expect(localStorage.getItem('osms.auth.user')).toBeNull();
  });
});
