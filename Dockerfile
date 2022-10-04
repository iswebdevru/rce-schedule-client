FROM node:16 AS build

WORKDIR /usr/client

COPY package*.json ./

RUN npm install
COPY . ./
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/client/dist /var/www/html