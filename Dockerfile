FROM node:lts-alpine as build-stage
ARG NG_APP_PROD_URL
ENV NG_APP_PROD_URL=$NG_APP_PROD_URL
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/task-fly-frontend /usr/share/nginx/html
COPY nginxconfig /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
