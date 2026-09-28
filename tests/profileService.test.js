import profileService from '../src/services/profile/profileService';
import apiClient from '../src/services/apiClient';

vi.mock('../src/services/apiClient');

describe('profileService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('retrieves the authenticated customer profile', async () => {
    const profile = {
      id: 'customer-1',
      name: 'Jane Doe',
      email: 'jane@example.com',
      address: '10 Main Street',
      phone: '+94711234567',
      role: 'CUSTOMER',
    };

    apiClient.get.mockResolvedValue({
      success: true,
      data: profile,
    });

    await expect(profileService.getProfile()).resolves.toEqual(profile);
    expect(apiClient.get).toHaveBeenCalledWith('/profile/me');
  });

  it('updates the authenticated customer profile with only the supplied fields', async () => {
    const changes = {
      name: 'Jane Updated',
      phone: '+94770000000',
    };

    const profile = {
      id: 'customer-1',
      ...changes,
      email: 'jane@example.com',
      address: '10 Main Street',
      role: 'CUSTOMER',
    };

    apiClient.patch.mockResolvedValue({
      success: true,
      data: profile,
    });

    await expect(profileService.updateProfile(changes)).resolves.toEqual(
      profile,
    );
    expect(apiClient.patch).toHaveBeenCalledWith('/profile/me', changes);
  });
});
