// src/environments/environment.prod.ts
export const environment = {
  production: true,

  // backend API deployato su Cloud Run
  apiBaseUrl: 'https://sharing-tv-app-be-1081841606305.europe-west1.run.app/api',

  // stream HLS dal media server in produzione (OME)
  liveHlsUrl: 'http://91.99.119.51:8880/live/stream/index.m3u8',
};
