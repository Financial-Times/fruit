'use strict';

exports.up = async database => {

	// Create the users table
	await database.schema.createTable('users', table => {

		// Meta information
		table.string('id').unique().primary();
		table.timestamp('created_at').defaultTo(database.fn.now());
		table.timestamp('updated_at').defaultTo(database.fn.now());

		// User information
		table.string('s3o_username').notNullable().unique();
		table.boolean('is_admin').notNullable().defaultTo(false);

	});

	// Create the fruit table
	await database.schema.createTable('fruit', table => {

		// Meta information
		table.string('id').unique().primary();
		table.string('creator_id').notNullable();
		table.timestamp('created_at').defaultTo(database.fn.now());
		table.timestamp('updated_at').defaultTo(database.fn.now());

		// Key information
		table.string('name').notNullable();
		table.json('alt_names').defaultTo('[]');
		table.string('description').notNullable();
		table.string('image_url').defaultTo(null);

		// Indexes and foreign key contraints
		table.foreign('creator_id').references('users.id');

	});

	// Create the fruit rating table
	await database.schema.createTable('fruit_rating', table => {

		// Meta information
		table.string('id').unique().primary();
		table.string('fruit_id').notNullable();
		table.string('user_id').notNullable();
		table.timestamp('created_at').defaultTo(database.fn.now());
		table.timestamp('updated_at').defaultTo(database.fn.now());

		// Key information
		table.integer('rating_taste').notNullable();
		table.integer('rating_mouthfeel').notNullable();
		table.integer('rating_preparation').notNullable();
		table.string('comments').notNullable();

		// Indexes and foreign key contraints
		table.foreign('fruit_id').references('fruit.id');
		table.foreign('user_id').references('users.id');

	});

};

exports.down = async database => {
	await database.schema.dropTable('fruit_rating');
	await database.schema.dropTable('fruit');
	await database.schema.dropTable('users');
};
