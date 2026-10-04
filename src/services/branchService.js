import apiClient from './apiClient';

function normalizeBranch(branch) {
  if (!branch || typeof branch !== 'object') {
    return null;
  }

  const id = branch.id ?? branch._id;

  if (!id && !branch.address && !branch.contactNumber) {
    return null;
  }

  return {
    id: String(id ?? ''),
    address: branch.address ?? '',
    contactNumber: branch.contactNumber ?? '',
  };
}

export async function getBranches() {
  const response = await apiClient.get('/branches');

  if (!Array.isArray(response?.data)) {
    return [];
  }

  return response.data
    .map((branch) => normalizeBranch(branch))
    .filter((branch) => branch && typeof branch.id === 'string' && branch.id);
}
