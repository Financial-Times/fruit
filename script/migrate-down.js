#!/usr/bin/env node
'use strict';

const dotenv = require('dotenv');
const FruitApp = require('../lib/app');

// Load configurations from an .env file if present
dotenv.config();

// Create a fruit application instance
const app = new FruitApp({
	databaseConnectionString: process.env.DATABASE_URL
});

// Migrate down
async function migrateDown() {
	try {
		await app.database.knex.migrate.rollback({
			directory: `${__dirname}/../data/migration`,
			tableName: 'migrations'
		});
		console.log('Rolled back the latest migration');
		process.exit(0);
	} catch (error) {
		console.error(error.stack);
		process.exit(1);
	}
}

migrateDown();
