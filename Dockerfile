FROM node:15.13.0-alpine3.10

RUN apk --no-cache add curl

WORKDIR /notification-service

COPY package.json package.json
COPY dist dist/
COPY logs logs/

RUN yarn

CMD ["node", "dist/src/main.js"]