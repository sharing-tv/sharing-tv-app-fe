// src/environments/environment.ts
export const environment = {
  production: false,

  // backend locale o remoto su Cloud Run
  apiBaseUrl: 'https://sharing-tv-app-be-1081841606305.europe-west1.run.app/api',

  // stream HLS locale
  liveHlsUrl: 'http://91.99.119.51:8880/live/stream/index.m3u8',
  liveUrl: 'http://91.99.119.51:8880/live/stream/index.m3u8',
};

