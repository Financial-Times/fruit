'use strict';

const express = require('express');
const httpError = require('http-errors');

/**
 * Initialise the people controller.
 * @param {FruitApp} fruitApp - A fruit application instance.
 * @param {Object} router - The front end Express router.
 * @returns {undefined} Nothing
 */
function initPeopleController(fruitApp, router) {

	// All people (who have rated a fruit)
	router.get('/people', async (request, response) => {
		const people = (await fruitApp.model.User.fetchAll())
			.map(item => item.serialize())
			.filter(item => item.ratingCount > 0);
		response.render('template/people/list', {
			people
		});
	});

	// Single person
	router.get('/people/:id', async (request, response, next) => {
		const person = await fruitApp.model.User.fetchOneById(request.params.id);
		if (!person) {
			return next();
		}
		const allRatings = await fruitApp.model.FruitRating.fetchByUser(person.id);
		response.render('template/people/show', {
			person: person.serialize(),
			allRatings: allRatings.map(item => item.serialize())
		});
	});

}

module.exports = initPeopleController;
