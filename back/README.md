<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Installation

```bash
$ yarn install
```

## Generate front types

```bash
$ npx swagger-typescript-api --extract-request-params --extract-request-body --extract-response-body --modular --axios --default-response unknown  -p ./swagger-spec.json -o ../front/src/api/generated
```

## Running with Docker

```bash
$ docker-compose up --build

$ docker-compose run nestjs yarn run migration:generate db/migrations/MigrationName

$ docker-compose run nestjs yarn run migration:run
```

Swagger: localhost:4200/swagger

PgAdmin: localhost:8080

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
