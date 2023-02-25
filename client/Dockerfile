ARG NODE_VERSION=18-alpine3.15
FROM node:$NODE_VERSION
WORKDIR /client
COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build