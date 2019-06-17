# cp-exchange

This is a fullstack MERN application that demonstrates the usage of MongoDB transactions.

It has a React frontend, Node backend powered by Express using MongoDB as the database.

It uses a monorepo architecture for source control. It uses yarn workspaces and lerna to help manage the monorepo structure.

## Directory Structure

```
|-- package.json
|-- lerna.json
|-- node_modules
|-- packages
    |-- client
    |   |-- public
    |   |-- src
    |   |-- package.json
    |   |-- README.md
    |-- server
        |-- env
        |-- bin
            |-- www
        |-- controllers
        |-- lib
        |-- helpers
        |-- utils
        |-- app.js
        |-- package.json
        |-- README.md