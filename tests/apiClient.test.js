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

  it('serializes request bodies as JSON', async () => {
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

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          email: 'jane@example.com',
          password: 'Password123',
        }),
      }),
    );
  });

  it('throws the backend error message when a request fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: vi.fn().mockResolvedValue({
        success: false,
        error: {
          message: 'Invalid email or password.',
          code: 'UNAUTHORIZED',
        },
      }),
    });

    await expect(
      apiClient.post(
        '/auth/login',
        {
          email: 'jane@example.com',
          password: 'WrongPassword',
        },
        {
          authenticated: false,
        },
      ),
    ).rejects.toMatchObject({
      message: 'Invalid email or password.',
      status: 401,
      code: 'UNAUTHORIZED',
    });
  });

  it('uses a safe fallback error when the backend response is not JSON', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
    });

    await expect(apiClient.get('/profile')).rejects.toMatchObject({
      message: 'Something went wrong while communicating with the server.',
      status: 500,
    });
  });

  it('returns null when a successful response has no JSON body', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 204,
      json: vi.fn().mockRejectedValue(new Error('No content')),
    });

    await expect(apiClient.delete('/profile')).resolves.toBeNull();
  });

  it('sends PATCH requests with the provided body', async () => {
    await apiClient.patch('/profile', {
      name: 'Jane Updated',
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({
          name: 'Jane Updated',
        }),
      }),
    );
  });

  it('sends DELETE requests correctly', async () => {
    await apiClient.delete('/profile');

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'DELETE',
      }),
    );
  });
});
