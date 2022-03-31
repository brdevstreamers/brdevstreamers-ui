FROM node:17-slim
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV production
RUN yarn
COPY . ./
CMD [ "yarn", "serve" ]
