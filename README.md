
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




Build iOS (Capacitor)
ionic build --prod
ionic capacitor copy ios
ionic capacitor sync ios
ionic capacitor add ios

ng generate module pages/live-nativo --module app.module.ts
ng generate module pages/live-nativo/live-nativo-routing --flat --module=pages/live-nativo/live-nativo.module.ts
ng g c pages/live-nativo --standalone false

# ng g page pages/admin-live-nativo

// ng generate module admin/admin-upload --module app.module.ts
// ng generate module admin/admin-upload-routing --flat --module=admin/admin-upload/admin-upload.module.ts
// ng g c admin/admin-upload --standalone false


// ng generate module admin/scarica --module app.module.ts
// ng generate module admin/scarica-routing --flat --module=admin/scarica/scarica.module.ts
// ng g c admin/scarica --standalone false
// ng g s admin/scarica/scarica

# ng g m pages/diretta --module app
# ng g c pages/diretta
# ng g m pages/diretta-routing --flat --module=pages/diretta/diretta.module.ts


# ng g m pages/vod --module app
ng g c pages/vod
ng g m pages/vod/vod-routing --flat --module=pages/vod/vod.module.ts

ng g c pages/vod/vod-detail

ionic serve

ng g c shared/live --standalone=false

ng g c pages/live-vod

ng g c admin/palinsesto

# un componente leggero che mostra:
  il video in autoplay
  il titolo del video attuale
  l’avanzamento
  e si aggiorna ogni minuto
ng g c components/live-vod-preview

ng g c components/mini-live-vod

ionic generate component components/navbar

# DOCKER
docker build -t sharingtv-fe .
docker run -p 4102:8080 sharingtv-fe



ionic g page pages/tv-player
  E questa pagina sarà il player ufficiale per TV:
  https://www.sharingtveuropa.it/tv


curl -I http://localhost:4100/live-stream/hls.m3u8
curl -I http://localhost:4100/live-stream/hls.m3u8

http://localhost:8100/player/hls
http://localhost:8100/player/dash


ionic build
ng build

# questa build genera www/
  ng build -c production

