'use strict';


angular.module('sportivity').controller('HomeController', ['$scope', '$location','Authentication', 'Activities', 'Groups',
	function($scope,$location, Authentication, Activities, Groups) {
    $scope.authentication = Authentication;
    $scope.activities = Activities.query();
    $scope.groups = Groups.query();

    $scope.go = function (path, activityId) {
      $location.path(path + '/' + activityId);
    };

		$scope.getClass = function(activity){
			var clazz = {'otherInventionsList':true};
			if(activity.user._id == $scope.authentication.user._id){
				clazz = {'myInventionsList':true}
			}
			return clazz;
		};
  }
]);