'use strict';


angular.module('sportivity').controller('ActivityController',
  ['$scope', '$location','Authentication', 'Activities', '$stateParams', 'Users', 'Groups', '$http', '$timeout',
	function($scope,$location, Authentication, Activities, $stateParams, Users, Groups, $http, $timeout) {
    $scope.authentication = Authentication;
    $scope.activities = Activities.query();
    $scope.groups = Groups.query();

    $scope.go = function (path, activityId) {
      $location.path(path + '/' + activityId);
    };
    $scope.create = function() {
      var activity = new Activities({
        title: this.title,
        content: this.content,
        location: this.location,
        eventDate: this.eventDate,
        group: this.selectedGroup._id,
        members: [$scope.authentication.user]
      });
      activity.$save(function(response) {
        Activities.get({activityId: response._id},
          function(data){
            for (var i = 0; i < data.group.members.length; i++) {
              $http.post('/emailActivity', {
                'user': $scope.authentication.user,
                'activity': data,
                'groupMember': data.group.members[i],
                'content': '<b>Where:</b> ' + data.location + '</br><b>When:</b> ' + data.eventDate +  '</br></br><b>Description:</b> ' + data.content
              })
            }
          });

        $location.path('activities/' + response._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });

      this.title = '';
      this.content = '';
      this.location = '';
      this.eventDate = '';
      this.selectedGroup = '';
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

		$scope.join = function () {

			if(!isUserExistInActivity()){
				$scope.activity.members.push($scope.authentication.user);
				$scope.update();
				$scope.imInActivity = true;
			}
		};

		$scope.removeFromActivity = function () {
			var stop = $scope.activity.members.length;
			var activityUsers = $scope.activity.members;
			var index = -1;
			for (var i = 0; i < stop; i++) {
				if (activityUsers[i]._id == $scope.authentication.user._id) {
					index = i;
				}
			}
			if(index > -1){
				$scope.activity.members.splice(index,1);
				$scope.imInActivity = false;
			}
			$scope.update();
		};

    $scope.update = function() {
      var activity = $scope.activity;
      activity.group = this.selectedGroup._id;
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
      $scope.activity = Activities.get({activityId: $stateParams.activityId},
      function(data){
        for(var i = 0; i < $scope.groups.length; i++){
          if($scope.groups[i]._id == data.group._id){
            $scope.selectedGroup = $scope.groups[i];
          }
        }
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

		function isUserExistInActivity(){
			var exist = false;
			if($scope.activity){
				var stop = $scope.activity.members.length;
				var activityUsers = $scope.activity.members;


				for (var i = 0; i < stop; i++) {
					if(activityUsers[i]._id == $scope.authentication.user._id){
						exist = true;
						break;
					}
				}
				$scope.imInActivity = exist;
			}
			return exist;
		}
    $timeout(isUserExistInActivity, 100);

		$scope.getActivitiesClass = function(activity){
			var clazz = {'otherInventionsList':true};
			if(activity.user !== undefined && $scope.authentication.user != undefined && activity.user._id == $scope.authentication.user._id){
				clazz = {'myInventionsList':true}
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