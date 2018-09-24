'use strict';

const adaro = require('adaro');
const getAppUrl = require('./middleware/get-app-url');
const bookshelf = require('bookshelf');
const bindLogger = require('./util/bind-logger');
const compression = require('compression');
const defaults = require('lodash/defaults');
const express = require('express');
const initControllers = require('../controller/index.js');
const initModels = require('../model/index.js');
const knex = require('knex');
const morgan = require('morgan');
const nocache = require('nocache');
const path = require('path');
const viewHelpers = require('../view/helper');

/**
 * Class representing the fruit application.
 */
class FruitApp {

	/**
	 * Create the fruit application.
	 * @param {Object} options - The fruit application options.
	 * @param {String} [options.databaseConnectionString] - A PostgreSQL connection string.
	 * @param {String} [options.environment] - The environment to run the fruit application in. One of "development", "production", or "test".
	 * @param {Object} [options.log] - A logger which has `error` and `info` methods.
	 * @param {(String|Number)} [options.port] - The HTTP port to run the fruit application on.
	 * @param {String} [options.requestLogFormat] - The Morgan request log format to use in request logging.
	 * @param {Stream} [options.requestLogStream] - The stream to pipe request logs to.
	 */
	constructor(options) {

		// Default the passed in options so we know we've got
		// everything that we need to start up
		this.options = defaults({}, options, FruitApp.defaults);
		this.environment = options.environment;

		// Set up the database
		this.database = FruitApp.createDatabaseConnection(this.options.databaseConnectionString);
		this.model = initModels(this);

		// Set up the Express application
		this.app = FruitApp.createExpressApplication(this);

		// Set some defaults for properties which are not present
		// until the fruit application is started
		this.address = null;
		this.server = null;

		// Bind the log methods so that we prefix all non request
		// logs with the application name
		this.log = bindLogger(this.options.log, 'Sidekick:');
		this.log.info('✔︎ initialization complete');

	}

	/**
	 * Start the fruit application, binding on the port configured during initialisation.
	 * @returns {Promise} A promise which resolves when the fruit application starts.
	 */
	start() {
		return new Promise((resolve, reject) => {

			// Start the Express application and capture the
			// server object that it returns
			this.server = this.app.listen(this.options.port, error => {

				if (error) {
					this.log.error(error.stack);
					return reject(error);
				}

				// We have to get the port here because sometimes
				// the port in the options is undefined or 0. If
				// that's the case then a random port is assigned
				// and we want to tell the user what it is
				const port = this.server.address().port;
				this.address = `http://localhost:${port}`;

				// All done
				this.log.info(`✔︎ started (${this.address}/ in ${this.environment} mode)`);
				resolve(this);

			});

		});
	}

	/**
	 * Create a Bookshelf database connection.
	 * @param {String} connectionString - A PostgreSQL connection string.
	 * @returns {Bookshelf} A Bookshelf instance.
	 */
	static createDatabaseConnection(connectionString) {
		return bookshelf(knex({
			client: 'pg',
			connection: connectionString
		}));
	}

	/**
	 * Create an Express application.
	 * @param {FruitApp} fruit application - The FruitApp instance to use in the application.
	 * @returns {Object} A configured Express application.
	 */
	static createExpressApplication(fruitApp) {
		const app = express();
		app.fruitApp = fruitApp;

		// Set some Express configurations
		app.set('env', fruitApp.environment);
		app.set('json spaces', 4);
		app.disable('x-powered-by');
		app.enable('strict routing');
		app.enable('case sensitive routing');

		// Configure s3o
		app.set('s3o-cookie-ttl', 1000 * 60 * 60 * 24 * 7); // 1 week

		// Configure the view engine. We use Adaro for
		// rendering Dust templates as it allows us to
		// load custom helpers easily
		app.set('views', path.resolve(__dirname, '../view'));
		app.engine('dust', adaro.dust({
			helpers: viewHelpers,
			whitespace: true
		}));
		app.set('view engine', 'dust');

		// Disable browser caching
		// (for alpha/beta, we'll do this properly later)
		app.disable('etag');
		app.use(nocache());

		// Compress responses with deflate
		app.use(compression());

		// Set up a morgan request logger. This outputs request
		// information, useful for debugging
		morgan.token('auth', (request, response, field) => {
			if (field === 'user' && request.authUser) {
				return request.authUser;
			}
			return '-';
		});
		app.use(morgan(fruitApp.options.requestLogFormat, {
			stream: fruitApp.options.requestLogStream
		}));

		app.use(getAppUrl(fruitApp.options.appUrl));

		// Mount top-level controllers
		app.use(initControllers(fruitApp));

		return app;
	}

}

/**
 * The default options used when constructing a fruit application.
 * @static
 */
FruitApp.defaults = {
	appUrl: null,
	databaseConnectionString: 'postgres://localhost:5432/fruit',
	environment: 'development',
	log: console,
	port: 8080,
	requestLogFormat: `${morgan.combined} authUser=":auth[user]"`
};

module.exports = FruitApp;
