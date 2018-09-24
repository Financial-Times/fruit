'use strict';

const shortid = require('shortid');

/**
 * Initialise the Fruit model.
 * @param {FruitApp} fruitApp - A FruitApp instance.
 * @returns {Model} A Bookshelf model.
 */
function initFruitRatingModel(fruitApp) {

	// Model prototypal methods
	const FruitRating = fruitApp.database.Model.extend({
		tableName: 'fruit_rating',

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

				// Encode the alt names if they have changed
				if (this.hasChanged('alt_names')) {
					this.attributes.alt_names = JSON.stringify(this.attributes.alt_names);
				}

			});

		},

		// Update the fruit rating with user-provided data
		async update(data) {
			if (data.rating_taste !== undefined) {
				this.set('rating_taste', data.rating_taste);
			}
			if (data.rating_mouthfeel !== undefined) {
				this.set('rating_mouthfeel', data.rating_mouthfeel);
			}
			if (data.rating_preparation !== undefined) {
				this.set('rating_preparation', data.rating_preparation);
			}
			if (data.comments !== undefined) {
				this.set('comments', data.comments);
			}
			await this.save();
			return this;
		},

		// Override default serialization so we can control output
		serialize() {
			return {
				id: this.get('id'),
				fruitId: this.get('fruit_id'),
				fruit: this.related('fruit').serialize(),
				userId: this.get('user_id'),
				user: this.related('user').serialize(),
				scores: {
					taste: this.get('rating_taste'),
					mouthfeel: this.get('rating_mouthfeel'),
					preparation: this.get('rating_preparation'),
					average: this.get('rating_average')
				},
				comments: this.get('comments'),
				meta: {
					dateCreated: this.get('created_at'),
					dateUpdated: this.get('updated_at')
				}
			};
		},

		// User relationship
		user() {
			return this.belongsTo(fruitApp.model.User);
		},

		// Fruit relationship
		fruit() {
			return this.belongsTo(fruitApp.model.Fruit);
		},

		// Model virtual methods
		outputVirtuals: false,
		virtuals: {

			// Get the rating average
			rating_average() {
				return Math.round(((
					this.get('rating_taste') +
					this.get('rating_mouthfeel') +
					this.get('rating_preparation')
				) / 3) * 10) / 10;
			}

		}

	// Model static methods
	}, {

		// Create a fruit rating with user-provided data
		async create(data) {
			const fruit = new FruitRating({
				fruit_id: data.fruit_id,
				user_id: data.user_id,
				rating_taste: data.rating_taste,
				rating_mouthfeel: data.rating_mouthfeel,
				rating_preparation: data.rating_preparation,
				comments: data.comments
			});
			await fruit.save();
			return fruit;
		},

		// Fetch all fruit ratings
		fetchAll() {
			return FruitRating.collection().query(qb => {
				qb.orderBy('created_at', 'desc');
			}).fetch({
				withRelated: [
					'user',
					'fruit'
				]
			});
		},

		// Fetch a fruit rating by id
		fetchOneById(fruitId) {
			return FruitRating.collection().query(qb => {
				qb.where('id', fruitId);
			}).fetchOne({
				withRelated: [
					'user',
					'fruit'
				]
			});
		},

		// Fetch all fruit ratings for a user
		fetchByUser(userId) {
			return FruitRating.collection().query(qb => {
				qb.where('user_id', userId);
				qb.orderBy('created_at', 'desc');
			}).fetch({
				withRelated: [
					'fruit'
				]
			});
		},

		// Fetch all fruit ratings for a fruit
		fetchByFruit(fruitId) {
			return FruitRating.collection().query(qb => {
				qb.where('fruit_id', fruitId);
				qb.orderBy('created_at', 'desc');
			}).fetch({
				withRelated: [
					'user'
				]
			});
		},

		// Fetch a fruit rating by user ID and fruit ID
		fetchOneByUserIdAndFruitId(userId, fruitId) {
			return FruitRating.collection().query(qb => {
				qb.where('user_id', userId);
				qb.where('fruit_id', fruitId);
			}).fetchOne();
		},

	});

	return FruitRating;
}

module.exports = initFruitRatingModel;
