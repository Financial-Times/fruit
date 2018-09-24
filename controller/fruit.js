'use strict';

const express = require('express');
const httpError = require('http-errors');

/**
 * Initialise the fruit controller.
 * @param {FruitApp} fruitApp - A fruit application instance.
 * @param {Object} router - The front end Express router.
 * @returns {undefined} Nothing
 */
function initFruitController(fruitApp, router) {

	// All fruit
	router.get('/fruit', async (request, response) => {
		const fruit = (await fruitApp.model.Fruit.fetchAll()).map(item => item.serialize());
		response.render('template/fruit/list', {
			fruit
		});
	});

	// Single fruit
	router.get('/fruit/:id', async (request, response, next) => {
		const fruit = await fruitApp.model.Fruit.fetchOneById(request.params.id);
		if (!fruit) {
			return next();
		}
		const userRating = await fruitApp.model.FruitRating.fetchOneByUserIdAndFruitId(request.authUser.id, fruit.id);
		const allRatings = await fruitApp.model.FruitRating.fetchByFruit(fruit.id);
		response.render('template/fruit/show', {
			fruit: fruit.serialize(),
			userRating: (userRating ? userRating.serialize() : null),
			allRatings: allRatings.map(item => item.serialize())
		});
	});

	// Rate fruit
	router.post('/fruit/:id', express.urlencoded({extended: false}), async (request, response, next) => {
		const fruit = await fruitApp.model.Fruit.fetchOneById(request.params.id);
		if (!fruit) {
			return next();
		}
		const userRating = await fruitApp.model.FruitRating.fetchOneByUserIdAndFruitId(request.authUser.id, fruit.id);

		// Some VERY basic sanitization and validation with no feedback...
		const body = request.body;
		body.taste = parseInt(body.taste, 10);
		body.mouthfeel = parseInt(body.mouthfeel, 10);
		body.preparation = parseInt(body.preparation, 10);
		if (isNaN(body.taste) || body.taste < 1 || body.taste > 10) {
			return next(httpError(400));
		}
		if (isNaN(body.mouthfeel) || body.mouthfeel < 1 || body.mouthfeel > 10) {
			return next(httpError(400));
		}
		if (isNaN(body.preparation) || body.preparation < 1 || body.preparation > 10) {
			return next(httpError(400));
		}
		body.comments = (body.comments ? body.comments.trim() || null : null);

		if (userRating) {
			await userRating.update({
				rating_taste: body.taste,
				rating_mouthfeel: body.mouthfeel,
				rating_preparation: body.preparation,
				comments: body.comments
			});
		} else {
			await fruitApp.model.FruitRating.create({
				fruit_id: fruit.id,
				user_id: request.authUser.id,
				rating_taste: body.taste,
				rating_mouthfeel: body.mouthfeel,
				rating_preparation: body.preparation,
				comments: body.comments
			});
		}

		response.redirect(`/fruit/${fruit.id}`)
	});

}

module.exports = initFruitController;
