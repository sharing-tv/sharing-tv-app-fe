
# Questo genera automaticamente:
    module.ts
    routing.module.ts
    page.ts
    page.html
    page.scss

ionic generate page pages/registrati
ionic generate page pages/login
ionic generate page pages/chi-siamo
ionic generate page pages/cosa-facciamo
ionic generate page pages/comitato-scientifico
ionic generate page pages/nostri-portali
ionic generate page pages/sharing-legalita
ionic generate page pages/sharing-ia

# Genera il service Auth
ionic generate service services/auth

# Genera la Guard
ionic generate guard guards/auth --implements CanActivate

ng generate component pages/live/live-player-hls --standalone=false
ng generate component pages/live/live-player-dash --standalone=false

ng generate component admin/palinsesto-ffmpeg --standalone=false

ng generate component admin/admin-upload --standalone=false

# 
    ionic serve