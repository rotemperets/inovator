'use strict';

angular.module('users').controller('EmailController', ['$scope','$routeParams', '$http', '$location', 'Authentication','Articles',
	function($scope, $routeParams, $http, $location, Authentication, Articles) {
		$scope.authentication = Authentication;
        $scope.article = Articles;
        $scope.$routeParams = $routeParams;
		//If user is signed in then redirect back home
		if (!$scope.authentication.user){
            $location.path('/');
        }

        $scope.email = function(article) {
            $http.post('/email', {
               'user': $scope.authentication.user

            }).success(function(data, status, headers, config) {
                if(data.success){
                    alert(data.domain);
                }else {
                    alert(data.error);
                }
            });
        };

	}
]);