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

// Seed the database with demo data
async function seed() {
	try {
		await app.database.knex.seed.run({
			directory: `${__dirname}/../data/seed/demo`
		});
		console.log('Seeded the database with demo data');
		process.exit(0);
	} catch (error) {
		console.error(error.stack);
		process.exit(1);
	}
}

seed();
