FROM node:16-alpine3.16
RUN apk update && apk add bash
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY ./ ./ 
CMD ["npm","run","start:dev"]
EXPOSE 3001
