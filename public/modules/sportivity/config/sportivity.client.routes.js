'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
      state('activities', {
        url: '/activities',
        templateUrl: 'modules/sportivity/views/activities.client.view.html'
      })
      .state('groups', {
        url: '/groups',
        templateUrl: 'modules/sportivity/views/groups.client.view.html'
			})
			.state('createActivity', {
				url: '/activity/create',
				templateUrl: 'modules/sportivity/views/new-activity.client.view.html'
			})
		.state('createGroup', {
			url: '/group/create',
			templateUrl: 'modules/sportivity/views/new-group.client.view.html'
		});
	}
]);