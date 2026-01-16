
# ============================
# STAGE 1 - BUILD
# ============================
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli @ionic/cli
RUN npm ci

COPY . .
RUN ionic build --configuration production


# ============================
# STAGE 2 - NGINX
# ============================
FROM nginx:alpine

# Rimuove config default
RUN rm /etc/nginx/conf.d/default.conf

# Config custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build Angular
COPY --from=build /app/www /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

