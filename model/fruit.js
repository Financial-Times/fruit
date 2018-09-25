'use strict';

const orderBy = require('lodash/orderBy');
const shortid = require('shortid');

/**
 * Initialise the Fruit model.
 * @param {FruitApp} fruitApp - A FruitApp instance.
 * @returns {Model} A Bookshelf model.
 */
function initFruitModel(fruitApp) {

	// Model prototypal methods
	const Fruit = fruitApp.database.Model.extend({
		tableName: 'fruit',

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
				if (this.hasChanged('alt_names') || typeof this.attributes.alt_names !== 'string') {
					this.attributes.alt_names = JSON.stringify(this.attributes.alt_names);
				}

			});

		},

		// Update the fruit with user-provided data
		async update(data) {
			if (data.name !== undefined) {
				this.set('name', data.name);
			}
			if (data.alt_names !== undefined) {
				this.set('alt_names', data.alt_names);
			}
			if (data.description !== undefined) {
				this.set('description', data.description);
			}
			if (data.image_url !== undefined) {
				this.set('image_url', data.image_url);
			}
			await this.save();
			return this;
		},

		// Override default serialization so we can control output
		serialize() {
			const ratingCount = this.related('ratings').length;
			const images = {
				full: this.get('image_url') || 'https://fruit.in.ft.com/default-image.png'
			};
			images.avatar80 = `https://www.ft.com/__origami/service/image/v2/images/raw/${encodeURIComponent(images.full)}?source=fruit&width=80&height=80`;
			images.avatar160 = `https://www.ft.com/__origami/service/image/v2/images/raw/${encodeURIComponent(images.full)}?source=fruit&width=160&height=160`;
			return {
				id: this.get('id'),
				creatorId: this.get('creator_id'),
				name: this.get('name'),
				altNames: this.get('alt_names'),
				description: this.get('description'),
				imageUrl: this.get('image_url'),
				images,
				meta: {
					dateCreated: this.get('created_at'),
					dateUpdated: this.get('updated_at')
				},
				hasRatings: (ratingCount > 0),
				ratingCount: ratingCount,
				score: this.get('score')
			};
		},

		// Rating relationship
		ratings() {
			return this.hasMany(fruitApp.model.FruitRating);
		},

		// Model virtual methods
		outputVirtuals: false,
		virtuals: {

			// Get the FruitScore™
			score() {
				const ratings = this.related('ratings');
				let score = 0;

				// Each rating is worth 20 points:
				// 10 points for taste
				// 5 points for mouthfeel (real score halved)
				// 5 points for preparation (real score halved)
				score = ratings.reduce((total, rating) => {
					return total + (
						rating.get('rating_taste') +
						(rating.get('rating_mouthfeel') / 2) +
						(rating.get('rating_preparation') / 2)
					);
				}, score);

				// 10 bonus points are awarded for popular fruit (1 point per rating up to a max of 10)
				score += Math.min(ratings.length, 10);

				// Calculate the score as a percentage of the max possible,
				// then divide by 10 to get an out-of-10 score
				const maxPossibleScore = (ratings.length * 20) + 10;
				return Math.round((score / maxPossibleScore) * 100) / 10;
			}

		}

	// Model static methods
	}, {

		// Create a fruit with user-provided data
		async create(data) {
			const fruit = new Fruit({
				name: data.name,
				altNames: data.alt_names,
				description: data.description,
				imageUrl: data.image_url,
				creator_id: data.creator_id
			});
			await fruit.save();
			return fruit;
		},

		// Fetch all fruit
		fetchAll() {
			return Fruit.collection().query(qb => {
				qb.orderBy('name', 'asc');
			}).fetch({
				withRelated: [
					'ratings'
				]
			});
		},

		// Fetch top X fruit (already serialized)
		async fetchTopX(count = 5) {
			const fruit = await Fruit.fetchAll();
			return orderBy(fruit.map(item => item.serialize()), [item => item.score], ['desc']).slice(0, 5);
		},

		// Fetch a fruit by id
		fetchOneById(fruitId) {
			return Fruit.collection().query(qb => {
				qb.where('id', fruitId);
			}).fetchOne({
				withRelated: [
					'ratings'
				]
			});
		}

	});

	return Fruit;
}

module.exports = initFruitModel;
