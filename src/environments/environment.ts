export const environment = {
  production: false,
  // backend locale in Docker
  // apiBaseUrl: 'http://localhost:4100/api',
  apiBaseUrl: 'https://sharing-tv-app-be-1081841606305.europe-west1.run.app',

  // stream HLS dal media server in locale
  // liveHlsUrl: 'http://localhost:8880/live/stream/index.m3u8',
  liveHlsUrl: 'http://91.99.119.51:8880/live/stream/index.m3u8',
  liveUrl: 'http://91.99.119.51:8880/live/stream/index.m3u8'
};

