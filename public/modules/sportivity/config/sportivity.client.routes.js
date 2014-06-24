'use strict';

// Setting up route
angular.module('sportivity').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');

    // Home state routing
    $stateProvider.
      state('activities', {
        url: '/activities',
        templateUrl: 'modules/sportivity/views/activities.client.view.html'
      })
      .state('createActivity', {
        url: '/activity/create',
        templateUrl: 'modules/sportivity/views/create-activity.client.view.html'
      })
      .state('groups', {
        url: '/groups',
        templateUrl: 'modules/sportivity/views/list-groups.client.view.html'
      })
      .state('createGroup', {
        url: '/groups/create',
        templateUrl: 'modules/sportivity/views/create-group.client.view.html'
      })
      .state('viewGroup', {
        url: '/groups/:groupId',
        templateUrl: 'modules/sportivity/views/view-group.client.view.html'
      })
      .state('editGroup', {
        url: '/groups/:groupId/edit',
        templateUrl: 'modules/sportivity/views/edit-group.client.view.html'
      });
    ;
  }
]);