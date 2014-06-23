
'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	activities = require('../../app/controllers/activities');

module.exports = function(app) {
	// Activity Routes
	app.route('/activities')
		.get(activities.list)
		.post(users.requiresLogin, activities.create);

	app.route('/activities/:activityId')
		.get(activities.read)
		.put(users.requiresLogin, activities.hasAuthorization, activities.update)
		.delete(users.requiresLogin, activities.hasAuthorization, activities.delete);

	// Finish by binding the activity middleware
	app.param('activityId', activities.activityByID);
};