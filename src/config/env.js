// Centralised access to build-time environment variables.
// Components/services should read configuration from here instead of
// referencing `import.meta.env` (or hardcoded values) directly.

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';

if (!apiBaseUrl && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    'VITE_API_BASE_URL is not set. Copy .env.example to .env and set a value.',
  );
}

export const env = {
  apiBaseUrl,
};
