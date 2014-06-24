'use strict';


angular.module('sportivity').controller('GroupController', ['$scope', '$location', 'Authentication', 'Groups', '$stateParams', 'Users',
  function ($scope, $location, Authentication, Groups, $stateParams, Users) {
    $scope.authentication = Authentication;
    $scope.groups = Groups.query();

    $scope.go = function (path, groupId) {
      $location.path(path + '/' + groupId);
    };
    $scope.create = function() {
      var group = new Groups({
        title: this.title,
        content: this.content,
        members: [$scope.authentication.user]
      });
      group.$save(function(response) {
        $location.path('groups/' + response._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });

      this.title = '';
      this.content = '';
    };
    $scope.remove = function(group) {
      if (group) {
        group.$remove();

        for (var i in $scope.groups) {
          if ($scope.groups[i] === group) {
            $scope.groups.splice(i, 1);
          }
        }
      } else {
        $scope.group.$remove(function() {
          $location.path('/groups');
        });
      }
    };
    $scope.update = function() {
      var group = $scope.group;

      group.$update(function() {
        $location.path('groups/' + group._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.find = function() {
      $scope.groups = Groups.query();
      $scope.users = Users.query();
    };
    $scope.findOne = function() {
      $scope.group = Groups.get({
        groupId: $stateParams.groupId
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
  }
]);

