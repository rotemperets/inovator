'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
      state('profile', {
        url: '/settings/profile',
        templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
      }).
      state('subscriptions', {
        url: '/settings/subscriptions',
        templateUrl: 'modules/users/views/settings/subscriptions.client.view.html'
      }).
      state('password', {
        url: '/settings/password',
        templateUrl: 'modules/users/views/settings/change-password.client.view.html'
      }).
      state('accounts', {
        url: '/settings/accounts',
        templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
      }).
      state('signup', {
        url: '/signup',
        templateUrl: 'modules/users/views/signup.client.view.html'
      }).
      state('signin', {
        url: '/signin',
        templateUrl: 'modules/users/views/signin.client.view.html'
      }).
      state('email', {
          url: '/email',
          templateUrl: 'modules/users/views/email.client.view.html'
      });
	}
]);