'use strict';


angular.module('sportivity').controller('HomeController', ['$scope', '$location','Authentication', 'Activities', 'Groups',
	function($scope,$location, Authentication, Activities, Groups) {
    $scope.authentication = Authentication;
    $scope.activities = Activities.query();
    $scope.groups = Groups.query();

    $scope.go = function (path, activityId) {
      $location.path(path + '/' + activityId);
    };
  }
]);