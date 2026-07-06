import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tamminahub.hrms',
  appName: 'HRMS',
  webDir: 'www/browser',
  android: {
    allowMixedContent: true
  }
};

export default config;
