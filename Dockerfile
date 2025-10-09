# === STAGE 1: Build Angular/Ionic app ===
FROM node:20 AS build

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di configurazione prima per sfruttare la cache
COPY package*.json ./

# Installa Ionic e Angular CLI globalmente
RUN npm install -g @angular/cli @ionic/cli

# Installa le dipendenze del progetto
RUN npm install

# Copia tutto il codice sorgente nel container
COPY . .

# Esegui la build di produzione Ionic/Angular
RUN ionic build --configuration production

# === STAGE 2: Serve tramite Nginx ===
FROM nginx:alpine

# Cambia la porta di ascolto a 8080 per Cloud Run
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf

# Copia il file di configurazione Nginx personalizzato (se lo usi)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia la build di produzione dal primo stage
COPY --from=build /app/www /usr/share/nginx/html

# Espone la porta
EXPOSE 8080

# Avvia Nginx
CMD ["nginx", "-g", "daemon off;"]
