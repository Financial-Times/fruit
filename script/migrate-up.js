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

// Migrate up
async function migrateUp() {
	try {
		await app.database.knex.migrate.latest({
			directory: `${__dirname}/../data/migration`,
			tableName: 'migrations'
		});
		console.log('Migrated to latest database schema');
		process.exit(0);
	} catch (error) {
		console.error(error.stack);
		process.exit(1);
	}
}

migrateUp();
