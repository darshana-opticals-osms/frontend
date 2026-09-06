import { env } from '../config/env';

// Foundation-level API client.
// This intentionally does not make any real HTTP requests yet - it only
// centralises the backend base URL so that future feature work (auth,
// products, appointments, etc.) has a single, consistent place to build
// API calls from, keeping API communication separate from UI components.
const apiClient = {
  baseUrl: env.apiBaseUrl,
};

export default apiClient;
