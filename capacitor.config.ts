import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sharingtv.app',
  appName: 'Sharing TV Europa',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: [
      'https://sharing-tv-app-be-1081841606305.europe-west1.run.app',
      'https://sharing-tv-app-fe-1081841606305.europe-west1.run.app',
      'http://localhost',
      'http://192.168.1.*'
    ],
  },
};

export default config;

