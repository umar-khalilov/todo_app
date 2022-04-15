FROM node:17-alpine3.15
RUN apk update && apk add bash
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install -g nodemon
RUN npm install -g sequelize-cli
RUN npm install
COPY ./ ./
CMD ["npm","run","start:dev"]
EXPOSE 3001