angular.module('app.userBracket', [])

.controller('UserBracket', function($scope, $location, Bracket) {
	var socket = io();

	Bracket.findUserBracket($location.url().slice(1))
	.then(function(response) {
		$scope.bracket = response.data;
	});
});
