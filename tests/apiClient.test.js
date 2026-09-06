import apiClient from '../src/services/apiClient';

describe('apiClient', () => {
  it('baseUrl is sourced from VITE_API_BASE_URL, not hardcoded', () => {
    const expected = import.meta.env.VITE_API_BASE_URL ?? '';
    expect(apiClient.baseUrl).toBe(expected);
  });

  it('baseUrl is a string (not undefined or null)', () => {
    expect(typeof apiClient.baseUrl).toBe('string');
  });
});
