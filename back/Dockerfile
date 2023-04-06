FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./yarn.lock /app/

RUN yarn install

COPY . /app/

EXPOSE 4200
CMD ["yarn", "run", "start:dev"]