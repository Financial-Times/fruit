'use strict';

/**
 * Initialise the home controller.
 * @param {FruitApp} fruitApp - A fruit application instance.
 * @param {Object} router - The front end Express router.
 * @returns {undefined} Nothing
 */
function initHomeController(fruitApp, router) {

	// Home page
	router.get('/', async (request, response) => {

		const highestScoringFruit = await fruitApp.model.Fruit.fetchTopX();
		const mostProlificRaters = await fruitApp.model.User.fetchMostProlificX();

		response.render('template/home', {
			highestScoringFruit,
			mostProlificRaters
		});

	});

}

module.exports = initHomeController;
