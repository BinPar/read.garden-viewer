FROM node:12-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

FROM base as build-base
RUN npm install

FROM build-base AS compile
COPY src ./src
COPY tests ./tests
COPY web ./web
COPY ["./.eslintignore", "./.eslintrc", "./jest-puppeteer.config.js", "./jest.config.js", "./tsconfig.jest.json", "./tsconfig.json", "./webpack.config.prod.js", "./"]
RUN npm run generate-contents
RUN npm run lint
RUN npm audit
RUN npm run build

FROM pierrezemb/gostatic
COPY --from=compile /usr/src/app/web /srv/http
