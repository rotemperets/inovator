'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles','$http','Users',
	function($scope, $stateParams, $location, Authentication, Articles, $http, Users) {
		$scope.authentication = Authentication;
		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content,
        members: [$scope.authentication.user]
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			this.title = '';
			this.content = '';
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('/');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
            $scope.users = Users.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
            $scope.users = Users.query();
		};

        $scope.filterMeOut = function(user)
        {
            // Do some tests

            if(user._id === $scope.authentication.user._id)
            {
                return false; // this will be listed in the results
            }

            return true; // otherwise it won't be within the results
        };


	}
]);