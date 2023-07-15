import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'CallingApp',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
