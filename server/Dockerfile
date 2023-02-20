FROM node:18-alpine3.15 as development
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install -g sequelize-cli && npm install
COPY ./ ./
ENV SERVER_PORT 4000
EXPOSE $SERVER_PORT
CMD ["node","main.js"]
