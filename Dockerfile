# Usa Nginx per servire la build PWA
FROM nginx:alpine

# Cloud Run usa la porta 8080
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf

# Copia il file di configurazione personalizzato
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia la build prod generata da Ionic
COPY www/ /usr/share/nginx/html

# Cloud Run avvia Nginx di default
