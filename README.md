
---

# 🌐 README — Frontend (sharing-tv-app-fe) — Ionic + Angular standalone false (Windows)

```md
# Sharing TV — Frontend (Ionic + Angular)

Frontend Ionic/Angular.  
Target: avvio in **Windows** (non in WSL).

## ✅ Requisiti

- Node.js 20 + npm su Windows
- Angular CLI e/o Ionic CLI (opzionali se usi gli npm script)
- Backend attivo su `http://localhost:4000`
- Media Server su `http://localhost:8888` (via WSL2/Docker)

## 🔧 Configurazione ambiente

Aggiorna `src/environments/environment.ts` (sviluppo):

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:4000/api',
  liveHlsUrl: 'http://localhost:8888/live/index.m3u8'
};

COMANDI: 
Installazione dipendenze ->
npm install

Avvio sviluppo ->
ionic serve

Collegamenti attesi
API → http://localhost:4000/api
HLS → http://localhost:8888/live/index.m3u8

Scripts utili:
npm run start → dev server (ng serve)
npm run build → build produzione (dist/) Questo genera la cartella: 
www/

Avvia il server locale in modalità produzione
npm run start:prod

npm run test → unit test (se configurati)

Esegui la build di produzione
ionic build --configuration production
serve -s www -l 8100



npm install -g serve


npm install @capacitor/core@latest @capacitor/cli@latest
Poi installa la piattaforma:
npm install @capacitor/android@latest @capacitor/ios@latest
npm install @capacitor/app@latest @capacitor/haptics@latest @capacitor/keyboard@latest @capacitor/status-bar@latest
E inizializza Capacitor:
npx cap init sharing-tv-app com.sharingtv.app

npm run build:mobile


✅ appId: com.sharingtv.app
✅ appName: Sharing TV
✅ webDir: www


Questo fa automaticamente: npm run prepare:android
ng build --configuration mobile
npx cap sync
npx cap open android

npm run prepare:android
