// src/environments/environment.prod.ts
export const environment = {
  production: true,

  // ✅ Backend API Cloud Run
  apiBaseUrl: 'https://sharingtveuropa.it/api',

  // ✅ Stream HLS tramite proxy backend Cloud Run
  // liveHlsUrl: 'https://sharing-tv-app-be-1081841606305.europe-west1.run.app/proxy/hls/live/stream/index.m3u8',
  // liveUrl: 'https://sharing-tv-app-be-1081841606305.europe-west1.run.app/proxy/hls/live/stream/index.m3u8',
};

