# AIMA - Advanced Inventory Management API

## Description

A simple API for managing inventory of a store. This API is built using NestJS and TypeORM.

## Installation

```bash
$ git clone https://github.com/tuanvu0995/aima-backend.git
$ cd aima-backend
$ npm install
$ cp .env.example .env
```

## Database setup

```bash
$ docker-compose -f docker-compose.dev.yml up -d
```

## Database migration

```bash
$ npm run migration:run
```

## Seeding data

We have some seed data for testing.You can run the following command to seed the data:

```bash
$ npm run seed

# or

$ npm run seed:refresh
```

The seed data includes:
    - users
    - products
    - suppliers
    - sales (includes last 6 months products sales data)

## Running the app

```bash
# development
$ npm run dev

# debug mode
$ npm run debug

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test:e2e
```

## Deployment

```bash
$ docker-compose -f docker-compose.deploy.yml up -d

$ docker exec -it backend npm run migration:run:prod
$ docker exec -it backend npm run seed:prod

```

## API Documentation

You can find the API documentation [here](/docs/API.md).

## License

MIT License
