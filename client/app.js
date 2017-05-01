angular.module('app', [
  'app.createBracket',
  'app.adminBracket',
  'app.userBracket',
  'app.services',
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'CreateBracket',
    templateUrl: 'routes/create-bracket.html'
  })
  .when('/a/:url', {
    controller: 'AdminBracket',
    templateUrl: 'routes/admin-bracket.html'
  })
  .otherwise({
    controller: 'UserBracket',
    templateUrl: 'routes/user-bracket.html'
  });
})