const local =
  window.location.hostname.startsWith('30.') ||
  window.location.hostname === 'localhost';

export const environment = {
  production: true,
  apiURL: 'http://localhost:4203',
};
