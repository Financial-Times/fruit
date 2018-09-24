'use strict';

const shortid = require('shortid');

/**
 * Initialise the User model.
 * @param {FruitApp} fruitApp - A FruitApp instance.
 * @returns {Model} A Bookshelf model.
 */
function initUserModel(fruitApp) {

	// Model prototypal methods
	const User = fruitApp.database.Model.extend({
		tableName: 'users',

		// Model initialization
		initialize() {

			// When a model is created...
			this.on('creating', () => {

				// Fill out automatic fields
				this.attributes.id = shortid.generate();
				this.attributes.created_at = new Date();

			});

			// When a model is saved...
			this.on('saving', async () => {

				// Fill out automatic fields
				this.attributes.updated_at = new Date();

			});

		},

		// Update the user with user-provided data
		async update(data) {
			if (data.s3o_username !== undefined) {
				this.set('s3o_username', data.s3o_username);
			}
			if (data.is_admin !== undefined) {
				this.set('is_admin', data.is_admin);
			}
			await this.save();
			return this;
		},

		// Override default serialization so we can control output
		serialize() {
			return {
				id: this.get('id'),
				username: this.get('s3o_username'),
				isAdmin: this.get('isAdmin'),
				meta: {
					dateCreated: this.get('created_at'),
					dateUpdated: this.get('updated_at')
				}
			};
		}

	// Model static methods
	}, {

		// Create a user with user-provided data
		async create(data) {
			const user = new User({
				s3o_username: data.s3o_username,
				is_admin: Boolean(data.is_admin)
			});
			await user.save();
			return user;
		},

		// Fetch all users
		fetchAll() {
			return User.collection().query(qb => {
				qb.orderBy('s3o_username', 'asc');
			}).fetch();
		},

		// Fetch a user by id
		fetchOneById(userId) {
			return User.collection().query(qb => {
				qb.where('id', userId);
			}).fetchOne();
		},

		// Fetch a user by s3o username
		fetchOneByUsername(username) {
			return User.collection().query(qb => {
				qb.where('s3o_username', username);
			}).fetchOne();
		},

		// Check whether a user with a given ID exists
		async existsById(userId) {
			const count = await User.collection().query(qb => {
				qb.where('id', userId);
			}).count();
			return (count > 0);
		},

		// Check whether a user with a given s3o username exists
		async existsByUsername(username) {
			const count = await User.collection().query(qb => {
				qb.where('s3o_username', username);
			}).count();
			return (count > 0);
		}

	});

	return User;
}

module.exports = initUserModel;
