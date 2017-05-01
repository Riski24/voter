angular.module('app.createBracket', [])

.controller('CreateBracket', function($scope, $location, Bracket) {
	$scope.serverResponded = false;

	$scope.createBracket = function() {
		Bracket.createBracket({
			name: $scope.name
		})
		.then(function(response) {
			$scope.serverResponded = true;
			var host = $location.host() + '/#/';
			$scope.adminUrl = host + 'a/' + response.data.adminUrl;
			$scope.userUrl = host + response.data.userUrl;
		});
	};
});
