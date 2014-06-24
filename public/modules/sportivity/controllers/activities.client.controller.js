'use strict';


angular.module('sportivity').controller('ActivityController', ['$scope', '$location','Authentication', 'Activities', '$stateParams', 'Users',
	function($scope,$location, Authentication, Activities, $stateParams, Users) {
    $scope.authentication = Authentication;
    $scope.activities = Activities.query();

    $scope.go = function (path, activityId) {
      $location.path(path + '/' + activityId);
    };
    $scope.create = function() {
      var activity = new Activities({
        title: this.title,
        content: this.content,
        location: this.location,
        eventDate: this.eventDate,
        members: [$scope.authentication.user]
      });
      activity.$save(function(response) {
        $location.path('activities/' + response._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });

      this.title = '';
      this.content = '';
      this.location = '';
      this.eventDate = '';
    };
    $scope.remove = function(activity) {
      if (activity) {
        activity.$remove();

        for (var i in $scope.activities) {
          if ($scope.activities[i] === activity) {
            $scope.activities.splice(i, 1);
          }
        }
      } else {
        $scope.activity.$remove(function() {
          $location.path('/');
        });
      }
    };
    $scope.update = function() {
      var activity = $scope.activity;

      activity.$update(function() {
        $location.path('activities/' + activity._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.find = function() {
      $scope.activities = Activities.query();
      $scope.users = Users.query();
    };
    $scope.findOne = function() {
      $scope.activity = Activities.get({
        activityId: $stateParams.activityId
      });
      $scope.users = Users.query();
    };
    $scope.filterMeOut = function(user){
      // Do some tests

      if(user._id === $scope.authentication.user._id)
      {
        return false; // this will be listed in the results
      }

      return true; // otherwise it won't be within the results
    };

    $scope.today = function() {
      $scope.eventDate = new Date();
    };
    $scope.today();
    $scope.clear = function () {
      $scope.eventDate = null;
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.format = 'dd-MM-yyyy hh:mm';


  }
]);