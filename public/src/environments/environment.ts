const local =
  window.location.hostname.startsWith('30.') ||
  window.location.hostname === 'localhost';

export const environment = {
  production: true,
  apiURL: local ? `http://${window.location.hostname}:4203` : 'http://localhost:4203',
};
