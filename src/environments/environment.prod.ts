export const environment = {
  production: true,
  // backend deployato (es. su Cloud Run o VPS con dominio configurato)
  apiBaseUrl: 'https://tuo-dominio-backend.com/api',

  // stream HLS dal media server in produzione
  liveHlsUrl: 'https://tuo-dominio-backend.com/live/stream/index.m3u8',
};

