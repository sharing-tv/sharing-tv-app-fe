# STEP 1: Build Ionic app
FROM node:20 AS build
WORKDIR /app

# Copia i file del progetto
COPY package*.json ./
RUN npm install -g @ionic/cli
RUN npm install

# Copia il resto del codice
COPY . .

# Build Ionic (in modalità produzione)
RUN ionic build --configuration production

# STEP 2: Serve con NGINX
FROM nginx:alpine

# Cambia porta di ascolto (Cloud Run usa 8080)
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf

# Copia il file di configurazione Nginx personalizzato (se lo hai)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia la build generata da Ionic
COPY --from=build /app/www /usr/share/nginx/html

# Espone la porta 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
