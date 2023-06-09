FROM node:18.2.0-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --omit=dev

COPY server/package*.json server/
RUN npm run install-server --omit=dev

ENV NODE_OPTIONS="--max-old-space-size=8192"

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD [ "npm", "run", "deploy" ]

EXPOSE 8000