# Blog-API

- [Blog-API](#blog-api)
  - [Description](#description)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [API Documentation](#api-documentation)
  - [Built With](#built-with)

## Description

This is a blog REST API, which should give users the ability to Register and
Login, make posts, and only delete or edit their posts.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` or `yarn` to install dependencies.
3. Navigate to the sql directory and run the script `./script` to setup the database migration.
4. Start the API in dev mode with `npm run dev` or `yarn dev`.

## Database Setup

1. Create a new PostgreSQL database named `blog`.
   - `CREATE DATABASE blog;`
2. Run the following commands to create a new PostgreSQL user:
   - `CREATE ROLE admin WITH LOGIN PASSWORD 'admin';`
   - `ALTER ROLE admin SUPERUSER CREATEROLE CREATEDB;`
   - `GRANT ALL PRIVILEGES ON DATABASE blog TO admin;`

**Note:** The `.env.example` file contains environment variables that are used by the application to connect to the database and Redis server, as well as the session secret key. Please review the file carefully before using it, and make any necessary changes to ensure that it works with your specific environment.

## API Documentation

[API](./documents/API.md) - Read the APIs documentation.

## Built With

- [Node.js](https://nodejs.org) - JavaScript Runtime
- [Express](https://expressjs.com/) - JavaScript API Framework
- [PostgreSQL](https://www.postgresql.org/) - Open Source Relational Database
