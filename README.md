# cp_exchange

This is a fullstack MERN application that demonstrates the usage of MongoDB transactions.

It has a React frontend, Node backend powered by Express using MongoDB as the database.

It uses a monorepo architecture for source control. It uses yarn workspaces and lerna to help manage the monorepo structure.

## Requirements

```
Node version = ^10
Yarn version = ^1.16
```

## Scripts

```
# to install dependencies
$ yarn install 

# to start both client/server development instances
$ yarn start

# to start client dev server
$ yarn start:client

# to start server dev server
$ yarn start:server

# to run dev MongoDB with replica sets (it will download 4.0.4 mongod and then start)
$ yarn db

# to use the mongod already installed in the system
$ yarn db:d

# to generate client production build
$ yarn build:client
```

## Deployment

- Frontend - `netlify.toml` is present to simplify frontend deployment to Netlify
- Backend - `Procfile` is present to simplify backend deployment to Heroku
- Database - can be deployed to Mongo Atlas (only one to support MongoDB transactions)

## Directory Structure

```
|-- package.json
|-- lerna.json
|-- node_modules
|-- packages
    |-- client
    |   |-- public
    |   |-- src
    |   |   |-- components
    |   |   |-- core
    |   |   |-- utils
    |   |-- package.json
    |   |-- README.md
    |-- server
        |-- env
        |-- bin
        |   |-- www
        |-- controllers
        |-- models
        |-- lib
        |-- helpers
        |-- utils
        |-- app.js
        |-- package.json
        |-- README.md
```