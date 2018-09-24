'use strict';

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
				if (this.hasChanged('alt_names')) {
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
			return {
				id: this.get('id'),
				name: this.get('name'),
				altNames: this.get('alt_names'),
				description: this.get('description'),
				imageUrl: this.get('image_url'),
				meta: {
					dateCreated: this.get('created_at'),
					dateUpdated: this.get('updated_at')
				}
			};
		}

	// Model static methods
	}, {

		// Create a fruit with user-provided data
		async create(data) {
			const fruit = new Fruit({
				name: data.name,
				altNames: data.alt_names,
				description: data.description,
				imageUrl: data.image_url
			});
			await fruit.save();
			return fruit;
		},

		// Fetch all fruit
		fetchAll() {
			return Fruit.collection().query(qb => {
				qb.orderBy('name', 'asc');
			}).fetch();
		},

		// Fetch a fruit by id
		fetchOneById(fruitId) {
			return Fruit.collection().query(qb => {
				qb.where('id', fruitId);
			}).fetchOne();
		}

	});

	return Fruit;
}

module.exports = initFruitModel;