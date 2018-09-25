'use strict';

const authS3O = require('@financial-times/s3o-middleware');
const express = require('express');
const initHomeController = require('./home');
const initFruitController = require('./fruit');
const initPeopleController = require('./people');
const iniStatsController = require('./stats');
const notFound = require('../lib/middleware/not-found');
const {redirectToHTTPS} = require('express-http-to-https');

/**
 * Initialise the controllers.
 * @param {FruitApp} fruitApp - A FruitApp instance.
 * @returns {Object} An Express router.
 */
function initControllers(fruitApp) {

	// Create an Express router for the front end
	const router = new express.Router({
		caseSensitive: true,
		strict: true
	});

	// Redirect HTTP to HTTPS
	router.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

	// Serve static files
	router.use(express.static(`${__dirname}/../public`));

	// Sign in with s3o
	router.use(authS3O);

	// Create/Get the authenticated user
	router.use(async (request, response, next) => {
		if (request.cookies.s3o_username) {
			// TODO this probably isn't secure
			const user = await fruitApp.model.User.fetchOneByUsername(request.cookies.s3o_username);
			if (!user) {
				request.authUser = await fruitApp.model.User.create({
					s3o_username: request.cookies.s3o_username
				});
			} else {
				request.authUser = user;
			}
		}
		next();
	});

	// Add default view data
	router.use((request, response, next) => {
		response.locals.appUrl = request.appUrl;
		response.locals.authUser = (request.authUser ? request.authUser.serialize() : null);
		response.locals.permissions = request.permissions;
		response.locals.requestPath = request.path;
		response.locals.requestUrl = request.url;
		next();
	});

	// Mount routes
	initHomeController(fruitApp, router);
	initFruitController(fruitApp, router);
	initPeopleController(fruitApp, router);
	iniStatsController(fruitApp, router);

	// Middleware to handle errors
	router.use(notFound());
	router.use((error, request, response, next) => { // eslint-disable-line no-unused-vars

		// The status code should be a client or server error
		const statusCode = (error.status && error.status >= 400 ? error.status : 500);

		// Render a helpful error page
		response.status(statusCode).render('template/error', {
			error: {
				status: statusCode,
				message: error.message,
				stack: (fruitApp.environment === 'development' ? error.stack : undefined)
			}
		});

		// Output server errors in the logs – we need
		// to know about these
		if (error.status >= 500) {
			fruitApp.log.error(error.stack);
		}

	});

	return router;
}

module.exports = initControllers;
