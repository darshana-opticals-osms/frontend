import apiClient from '../src/services/apiClient';
import authStorage from '../src/services/auth/authStorage';

describe('apiClient', () => {
  beforeEach(() => {
    localStorage.clear();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({
          success: true,
          data: {},
        }),
      }),
    );
  });

  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('baseUrl is sourced from VITE_API_BASE_URL, not hardcoded', () => {
    const expected = import.meta.env.VITE_API_BASE_URL ?? '';

    expect(apiClient.baseUrl).toBe(expected);
  });

  it('baseUrl is a string (not undefined or null)', () => {
    expect(typeof apiClient.baseUrl).toBe('string');
  });

  it('adds the stored JWT as a Bearer token to authenticated requests', async () => {
    authStorage.saveAuth('test-jwt-token', {
      id: 'customer-1',
      name: 'Jane Doe',
      role: 'CUSTOMER',
    });

    await apiClient.get('/profile');

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-jwt-token',
        }),
      }),
    );
  });

  it('does not send an Authorization header for public requests', async () => {
    authStorage.saveAuth('test-jwt-token', {
      id: 'customer-1',
      name: 'Jane Doe',
      role: 'CUSTOMER',
    });

    await apiClient.post(
      '/auth/login',
      {
        email: 'jane@example.com',
        password: 'Password123',
      },
      {
        authenticated: false,
      },
    );

    const [, requestOptions] = fetch.mock.calls[0];

    expect(requestOptions.headers.Authorization).toBeUndefined();
  });
});
