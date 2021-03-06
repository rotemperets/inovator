'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('sportivity').factory('Activities', ['$resource',
	function($resource) {
		return $resource('activities/:activityId', {
      activityId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);