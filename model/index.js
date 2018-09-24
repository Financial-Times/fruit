'use strict';

const initUserModel = require('./user');

/**
 * Initialise the models.
 * @param {FruitApp} fruitApp - A FruitApp instance.
 * @returns {Model} A Bookshelf model.
 */
function initModels(fruitApp) {
	return {
		User: initUserModel(fruitApp)
	};
}

module.exports = initModels;
