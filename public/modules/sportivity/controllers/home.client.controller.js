'use strict';


angular.module('sportivity').controller('HomeController', ['$scope', '$location','Authentication', 'Activities', 'Groups',
	function($scope,$location, Authentication, Activities, Groups) {
    $scope.authentication = Authentication;
    $scope.activities = Activities.query();
    $scope.groups = Groups.query();

    $scope.go = function (path, activityId) {
      $location.path(path + '/' + activityId);
    };

		$scope.getActivitiesClass = function(activity){
			var clazz = {'otherInventionsList':true};
			if(activity.user !== undefined && $scope.authentication.user != undefined && activity.user._id == $scope.authentication.user._id){
				clazz = {'myInventionsList':true}
			}
			return clazz;
		};

		$scope.getGroupsClass = function(group){
			var clazz = {'otherGroupsHome':true};
			if(group.user !== undefined && $scope.authentication.user != undefined && group.user._id == $scope.authentication.user._id){
				clazz = {'myGroupsHome':true}
			}
			return clazz;
		};

    $scope.showCheck = function(item){
      if(item){
        for (var i = 0; i < item.members.length; i++) {
          if(item.members[i]._id == $scope.authentication.user._id){
            return true;
          }
        }
      }
      return false;
    }
  }
]);