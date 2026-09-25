import apiClient from '../apiClient';

async function getProfile() {
  const response = await apiClient.get('/profile/me');

  return response.data;
}

async function updateProfile(profileChanges) {
  const response = await apiClient.patch('/profile/me', profileChanges);

  return response.data;
}

const profileService = {
  getProfile,
  updateProfile,
};

export default profileService;
