'use strict';

const initUserModel = require('./user');
const initFruitModel = require('./fruit');
const initFruitRatingModel = require('./fruit-rating');

/**
 * Initialise the models.
 * @param {FruitApp} fruitApp - A FruitApp instance.
 * @returns {Model} A Bookshelf model.
 */
function initModels(fruitApp) {
	return {
		User: initUserModel(fruitApp),
		Fruit: initFruitModel(fruitApp),
		FruitRating: initFruitRatingModel(fruitApp)
	};
}

module.exports = initModels;
