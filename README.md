
# Fruit

Fruit is a comprehensive rating system for fruit at the FT.


## Table Of Contents

  - [Requirements](#requirements)
  - [Deployment](#deployment)
  - [Running locally](#running-locally)
  - [Configuration](#configuration)
  - [Contributing](#contributing)
  - [License](#license)


## Requirements

This application requires [Node.js] 10+ and [PostgreSQL] 9.4+.


## Deployment

Fruit can run anywhere that meets the above requirements. The instructions for [running locally](#running-locally) can be used as a guide, but we also maintain quick-starts for common deployment targets (well, one deployment target):

  - **Heroku**:<br/>
    Deploy Fruit to Heroku using a one-click button or a series of instructions: [Heroku Deployment Guide](docs/deploy/heroku.md)


## Running locally

  1. Install dependencies:

     ```sh
     npm install
     ```

  2. Create a database. If you have the `psql` command on your path then you can try running the following:

     ```sh
     make db-create
     ```

     Otherwise you may have to authenticate to create the database, the SQL you need to run is:

     ```sql
     CREATE DATABASE fruit
     ```

  3. Run the database migrations:

     ```sh
     make db-migrate-up
     ```

  4. Optionally seed the database with some test data:

     ```sh
     make db-seed
     ```

  5. Start the application in either production mode:

     ```sh
     make start
     ```

     or development mode (with auto reloading):

     ```sh
     make start-dev
     ```

  6. Open the application <http://localhost:8080/>


## Configuration

You can configure Fruit with the following [environment variables]:

  - **`DATABASE_URL`**: A PostgreSQL connection string, used to connect to the database.<br/>
    Default: `postgres://localhost:5432/fruit`

  - **`LOG_LEVEL`**: The lowest level of logs to output, one of `error`, `warn`, `info`, `verbose`, `debug`.<br/>
    Default: `verbose` in production and `debug` in development.

  - **`NODE_ENV`**: The environment to run the application in, one of `production`, `development`, `test`.<br/>
    Default: `development`.

  - **`PORT`**: The HTTP port to run the application on. If set to an empty string, a random port will be assigned.<br/>
    Default: `8080`.

  - **`REQUEST_LOG_FORMAT`**: The log format to use for request logging, one of [morgan's predefined formats][morgan-formats].<br/>
    Default: `combined`.

Fruit will first attempt to load an `.env` file in the root of the project and read configurations from there. You can copy the sample environment config as a starting point:

```sh
make config
```

Alternatively you can set environment variables before running your command. Here's an example:

```sh
LOG_LEVEL=debug PORT=1234 REQUEST_LOG_FORMAT=tiny make start
```


## Contributing

If you're ready to contribute to Fruit, clone this repo locally and commit your code on a new branch. Check that everything works by running the application locally and also running the following command before opening a <abbr title="pull request">PR</abbr>:

```sh
make ci
```


## Licence

Licensed under the [MIT License](LICENSE).<br/>
Copyright &copy; 2018, Financial Times



[environment variables]: https://en.wikipedia.org/wiki/Environment_variable
[morgan-formats]: https://github.com/expressjs/morgan#predefined-formats
[node.js]: https://nodejs.org/
[postgresql]: http://www.postgresql.org/
