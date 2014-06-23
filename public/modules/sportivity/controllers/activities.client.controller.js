'use strict';


angular.module('core').controller('ActivityController', ['$scope', '$location','Authentication', 'Activities',
	function($scope,$location, Authentication, Activities) {
        $scope.inventions = Activities.query();

        $scope.go = function ( path, activityId ) {
            $location.path( path + '/' + activityId );
        };
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);