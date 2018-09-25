'use strict';

const express = require('express');

/**
 * Initialise the stats controller.
 * @param {FruitApp} fruitApp - A fruit application instance.
 * @param {Object} router - The front end Express router.
 * @returns {undefined} Nothing
 */
function initStatsController(fruitApp, router) {

	// All stats
	router.get('/stats', async (request, response) => {
		response.render('template/stats', {
			stats: {
				userCount: await fruitApp.model.User.countAll(),
				raterCount: await fruitApp.model.User.countAllWithRatings(),
				ratingsCount: await fruitApp.model.FruitRating.countAll()
			}
		});
	});

}

module.exports = initStatsController;
