FROM node:16-alpine

ENV TZ="America/Fortaleza"

WORKDIR /usr/src/app

COPY . .

RUN npm install &&\
    npm run build &&\
    npm prune --production &&\
    npm cache clean -f

CMD [ "node", "dist/shared/infra/http/server.js" ]
