const local =
  window.location.hostname.startsWith('30.') ||
  window.location.hostname === 'localhost';

export const environment = {
  production: true,
  apiURL: 'https://hrms.tamminahub.com',
};
