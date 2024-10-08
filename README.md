# Recruiting Challenge

## Technologies used:

- NestJS
- TypeScript
- TypeORM
- PostgreSQL

## How to start a project:

Install the packages:

```
yarn
```

Add .env file to root directory:

```
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=<your username>
DB_PASSWORD=<your passoword>
DB_DATABASE=<your database name>
DB_SYNCHRONIZE=true
```

Start the project:

```
yarn start:dev
```

## Implemented

- Created NestJS application
- Implemented mock service for transactions
- Created aggregation service for processing snd storing the data
- Implemented API for retrieving aggregation data and payout info
