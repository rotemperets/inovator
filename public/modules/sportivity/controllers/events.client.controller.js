'use strict';


angular.module('core').controller('EventController', ['$scope', '$location','Authentication', 'Articles',
	function($scope,$location, Authentication, Articles) {
        $scope.inventions = Articles.query();

        $scope.go = function ( path, articleId ) {
            $location.path( path + '/' + articleId );
        };
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);