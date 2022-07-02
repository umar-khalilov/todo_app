FROM node:16-alpine3.16
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install -g sequelize-cli && npm install
COPY ./ ./
ENV PORT 3001
CMD ["npm","run","start:dev"]
EXPOSE $PORT
