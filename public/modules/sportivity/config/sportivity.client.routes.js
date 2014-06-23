'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
      state('events', {
        url: '/events',
        templateUrl: 'modules/sportivity/views/events.client.view.html'
      })
      .state('groups', {
        url: '/groups',
        templateUrl: 'modules/sportivity/views/groups.client.view.html'
      });
	}
]);