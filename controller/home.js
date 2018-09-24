'use strict';

/**
 * Initialise the home controller.
 * @param {FruitApp} fruitApp - A fruit application instance.
 * @param {Object} router - The front end Express router.
 * @returns {undefined} Nothing
 */
function initHomeController(fruitApp, router) {

	// Home page
	router.get('/', (request, response) => {
		response.render('template/home');
	});

}

module.exports = initHomeController;
