### STAGE 1: Build ###
FROM node:17-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn run build

### STAGE 2: Run ###
FROM staticfloat/nginx-certbot
ENV CERTBOT_EMAIL flaviojmendes@gmail.com
COPY ./nginx.conf /etc/nginx/user.conf.d/
COPY --from=build /usr/src/app/build /usr/share/nginx/html