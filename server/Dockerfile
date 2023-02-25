FROM node:18-alpine3.15 as development
# RUN apt update && apt install -y --no-install-recommends dumb-init
ENV NODE_ENV development
WORKDIR /usr/src/app
COPY --chown=node:node . .
COPY ./package*.json ./ 
RUN npm install -g sequelize-cli && npm install
COPY ./ /usr/src/app
ENV SERVER_PORT 4000
EXPOSE $SERVER_PORT
USER node
CMD ["node", "main.js"]
