'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('sportivity').factory('Groups', ['$resource',
	function($resource) {
		return $resource('groups/:groupId', {
			groupId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);