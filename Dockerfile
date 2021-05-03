# Install dependencies
FROM node:14.15.3-alpine3.12 as install

WORKDIR /usr/src/app

ARG OPS_ENV=local
ENV VUE_APP_OPS_ENV=$OPS_ENV

COPY package*.json ./
RUN npm install

EXPOSE 8080

# production build
FROM node:14.15.3-alpine3.12 as build

WORKDIR /usr/src/app

ARG OPS_ENV=local
ENV VUE_APP_OPS_ENV=$OPS_ENV

COPY --from=install /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

# nginx
FROM nginx:1.18.0-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

