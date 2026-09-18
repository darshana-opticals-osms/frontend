import { env } from '../config/env';
import authStorage from './auth/authStorage';

function buildUrl(path) {
  const baseUrl = env.apiBaseUrl.replace(/\/+$/, '');
  const cleanPath = path.replace(/^\/+/, '');

  return `${baseUrl}/${cleanPath}`;
}

async function request(path, options = {}) {
  const { method = 'GET', body, headers = {}, authenticated = true } = options;

  const requestHeaders = {
    ...headers,
  };

  if (body !== undefined) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  if (authenticated) {
    const token = authStorage.getToken();

    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(buildUrl(path), {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let responseData = null;

  try {
    responseData = await response.json();
  } catch {
    responseData = null;
  }

  if (!response.ok) {
    const message =
      responseData?.error?.message ||
      responseData?.message ||
      'Something went wrong while communicating with the server.';

    const error = new Error(message);
    error.status = response.status;
    error.code = responseData?.error?.code;

    throw error;
  }

  return responseData;
}

const apiClient = {
  baseUrl: env.apiBaseUrl,

  get(path, options = {}) {
    return request(path, {
      ...options,
      method: 'GET',
    });
  },

  post(path, body, options = {}) {
    return request(path, {
      ...options,
      method: 'POST',
      body,
    });
  },

  patch(path, body, options = {}) {
    return request(path, {
      ...options,
      method: 'PATCH',
      body,
    });
  },

  delete(path, options = {}) {
    return request(path, {
      ...options,
      method: 'DELETE',
    });
  },
};

export default apiClient;
