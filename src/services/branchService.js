import apiClient from './apiClient';

function normalizeBranch(branch) {
  if (!branch || typeof branch !== 'object' || Array.isArray(branch)) {
    return null;
  }

  const id = branch.id;

  if (typeof id !== 'string' || !id.trim()) {
    return null;
  }

  return {
    id,
    address: branch.address ?? '',
    contactNumber: branch.contactNumber ?? '',
  };
}

/**
 * Loads safe Branch references from the authenticated DDP-069 endpoint.
 * @returns {Promise<Array<{ id: string, address: string, contactNumber: string }>>}
 */
export async function getBranches() {
  const response = await apiClient.get('/branches');

  if (!Array.isArray(response?.data)) {
    return [];
  }

  return response.data.map(normalizeBranch).filter(Boolean);
}
