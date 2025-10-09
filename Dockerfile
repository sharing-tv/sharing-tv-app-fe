# STEP 1: Build Ionic app
FROM node:20 AS build
WORKDIR /app

# Copia i file di progetto
COPY package*.json ./
RUN npm install -g @ionic/cli
RUN npm install

# Copia tutto il codice sorgente
COPY . .

# Esegui build di Ionic in produzione
RUN ionic build --configuration production

# STEP 2: Serve con NGINX
FROM nginx:alpine

# Imposta la porta corretta per Cloud Run
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf

# Copia configurazione personalizzata (se presente)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia la build generata da Ionic
COPY --from=build /app/www /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
