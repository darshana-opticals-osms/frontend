import { beforeEach, describe, expect, it, vi } from 'vitest';
import apiClient from '../src/services/apiClient';
import { getBranches } from '../src/services/branchService';

vi.mock('../src/services/apiClient', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('branchService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls the shared backend branch endpoint with authenticated requests', async () => {
    apiClient.get.mockResolvedValueOnce({
      success: true,
      data: [
        {
          id: 'branch-1',
          address: '45 Peradeniya Road, Kandy',
          contactNumber: '+94 81 220 0000',
        },
      ],
    });

    await getBranches();

    expect(apiClient.get).toHaveBeenCalledWith('/branches');
  });

  it('returns normalized safe branch data from a successful response', async () => {
    apiClient.get.mockResolvedValueOnce({
      success: true,
      data: [
        {
          id: 'branch-1',
          address: '45 Peradeniya Road, Kandy',
          contactNumber: '+94 81 220 0000',
          _id: 'ignored',
          __v: 0,
          createdAt: '2024-01-01',
        },
      ],
    });

    await expect(getBranches()).resolves.toEqual([
      {
        id: 'branch-1',
        address: '45 Peradeniya Road, Kandy',
        contactNumber: '+94 81 220 0000',
      },
    ]);
  });

  it('returns an empty array when the backend returns no branch array', async () => {
    apiClient.get.mockResolvedValueOnce({
      success: true,
      data: null,
    });

    await expect(getBranches()).resolves.toEqual([]);
  });

  it('returns an empty array when the backend returns an empty array', async () => {
    apiClient.get.mockResolvedValueOnce({
      success: true,
      data: [],
    });

    await expect(getBranches()).resolves.toEqual([]);
  });

  it('accepts _id fallback and ignores malformed branch records', async () => {
    apiClient.get.mockResolvedValueOnce({
      success: true,
      data: [
        null,
        {
          _id: 'branch-9',
          address: '130 Kandy Road, Gampola',
          contactNumber: '+94 81 300 1000',
        },
        {
          id: 123,
          address: '123 Colombo Road',
          contactNumber: '+94 11 200 2000',
        },
        {},
      ],
    });

    await expect(getBranches()).resolves.toEqual([
      {
        id: 'branch-9',
        address: '130 Kandy Road, Gampola',
        contactNumber: '+94 81 300 1000',
      },
      {
        id: '123',
        address: '123 Colombo Road',
        contactNumber: '+94 11 200 2000',
      },
    ]);
  });

  it('propagates backend and network errors', async () => {
    const backendError = new Error('Server unavailable');
    backendError.status = 500;
    apiClient.get.mockRejectedValueOnce(backendError);

    await expect(getBranches()).rejects.toThrow('Server unavailable');

    const networkError = new Error(
      'Unable to reach the server. Please check your connection and try again.',
    );
    networkError.status = 0;
    networkError.code = 'NETWORK_ERROR';
    apiClient.get.mockRejectedValueOnce(networkError);

    await expect(getBranches()).rejects.toMatchObject({
      status: 0,
      code: 'NETWORK_ERROR',
    });
  });

  it('does not expose or fabricate branch names', async () => {
    apiClient.get.mockResolvedValueOnce({
      success: true,
      data: [
        {
          id: 'branch-1',
          address: '45 Peradeniya Road, Kandy',
          contactNumber: '+94 81 220 0000',
        },
      ],
    });

    const branches = await getBranches();

    expect(branches[0]).toEqual({
      id: 'branch-1',
      address: '45 Peradeniya Road, Kandy',
      contactNumber: '+94 81 220 0000',
    });
    expect(branches[0]).not.toHaveProperty('name');
    expect(branches[0]).not.toHaveProperty('_id');
    expect(branches[0]).not.toHaveProperty('__v');
    expect(branches[0]).not.toHaveProperty('createdAt');
  });
});
