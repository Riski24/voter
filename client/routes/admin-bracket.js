angular.module('app.adminBracket', [])

.controller('AdminBracket', function($scope, $routeParams, $location, Bracket, Competitor) {
	var socket = io();

	Bracket.findAdminBracket($routeParams.url)
	.then(function(response) {
		$scope.bracket = response.data;

		getCompetitorList();
	});

	$scope.addCompetitor = function() {
		Competitor.createCompetitor({
			bracketId: $scope.bracket.id,
			name: $scope.competitorName
		})
		.then(function(response) {
			socket.emit('competitorListChange');
		});
	};

	$scope.deleteCompetitor = function(id) {
		Competitor.deleteCompetitor(id)
		.then(function(response) {
			socket.emit('competitorListChange');
		});
	};

	$scope.randomizePairs = function() {
		var competitors = [];

		$scope.competitors.forEach(function(competitor) {
			competitors.push(competitor.id);
		});
		if (competitors.length % 2 !== 0) {
			competitors.push('BYE');
		}

		for (var i = 0; i < competitors.length; i++) {
			var index = Math.floor(Math.random() * (competitors.length - i) + i);
			if (index !== i) {
				var temp = competitors[i];
				competitors[i] = competitors[index];
				competitors[index] = temp;
			}
		}

		Competitor.sendPairs({bracketId: $scope.bracket.id, competitors: competitors})
		.then(function(response) {
			socket.emit('competitorListChange');
		});
	};

	socket.on('competitorListChange', function() {
		getCompetitorList();
	});

	var getCompetitorList = function() {
		Competitor.findBracketCompetitors($scope.bracket.id)
		.then(function(response) {
			$scope.competitors = response.data;
		});
	};
});
