'use strict';

const dotenv = require('dotenv');
const FruitApp = require('./lib/app');
const winston = require('winston');

// Load configurations from an .env file if present
dotenv.config();

// Grab configurations from environment variables
const options = {
	appUrl: process.env.APP_URL,
	databaseConnectionString: process.env.DATABASE_URL,
	environment: process.env.NODE_ENV,
	port: process.env.PORT,
	requestLogFormat: process.env.REQUEST_LOG_FORMAT
};

// Create a logger to use in the application
options.log = new winston.Logger({
	level: process.env.LOG_LEVEL || (options.environment === 'production' ? 'verbose' : 'debug'),
	transports: [
		new winston.transports.Console({
			showLevel: false
		})
	]
});

// Set up a request logger (should only appear when
// the log level is verbose)
options.requestLogStream = {
	write: message => options.log.verbose(message.trim())
};

// Initialise and start the app
const app = new FruitApp(options);
app.start();
