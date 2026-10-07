import { beforeEach, describe, expect, it, vi } from 'vitest';
import apiClient from '../src/services/apiClient';
import * as branchService from '../src/services/branchService';
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

  it('returns an empty array when the response envelope is missing', async () => {
    apiClient.get.mockResolvedValueOnce(null);

    await expect(getBranches()).resolves.toEqual([]);
  });

  it('returns an empty array when the backend returns an empty array', async () => {
    apiClient.get.mockResolvedValueOnce({
      success: true,
      data: [],
    });

    await expect(getBranches()).resolves.toEqual([]);
  });

  it('rejects malformed records and records without a documented Branch ID', async () => {
    apiClient.get.mockResolvedValueOnce({
      success: true,
      data: [
        null,
        [],
        {},
        {
          address: '130 Kandy Road, Gampola',
          contactNumber: '+94 81 300 1000',
        },
        {
          _id: 'undocumented-id',
          address: '130 Kandy Road, Gampola',
          contactNumber: '+94 81 300 1000',
        },
        {
          id: '',
          address: '130 Kandy Road, Gampola',
          contactNumber: '+94 81 300 1000',
        },
        {
          id: 123,
          address: '123 Colombo Road',
          contactNumber: '+94 11 200 2000',
        },
      ],
    });

    await expect(getBranches()).resolves.toEqual([]);
  });

  it.each([401, 403])(
    'propagates %s authorization errors unchanged',
    async (status) => {
      const authError = new Error(`Request rejected: ${status}`);
      authError.status = status;
      apiClient.get.mockRejectedValueOnce(authError);

      await expect(getBranches()).rejects.toBe(authError);
    },
  );

  it('propagates server and network errors unchanged', async () => {
    const backendError = new Error('Server unavailable');
    backendError.status = 500;
    apiClient.get.mockRejectedValueOnce(backendError);

    await expect(getBranches()).rejects.toBe(backendError);

    const networkError = new Error(
      'Unable to reach the server. Please check your connection and try again.',
    );
    networkError.status = 0;
    networkError.code = 'NETWORK_ERROR';
    apiClient.get.mockRejectedValueOnce(networkError);

    await expect(getBranches()).rejects.toBe(networkError);
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

  it('does not export Branch mutation methods', () => {
    expect(branchService.createBranch).toBeUndefined();
    expect(branchService.updateBranch).toBeUndefined();
    expect(branchService.deleteBranch).toBeUndefined();
  });
});
