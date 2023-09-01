FROM node:18-alpine as build-stage

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine as production-stage

WORKDIR /app

COPY --from=build-stage /app/dist .

COPY --from=build-stage /app/package.json ./package.json

RUN npm install --production

EXPOSE 3000

CMD [ "node", "./main.js" ]