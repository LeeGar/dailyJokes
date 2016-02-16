angular.module('jokes', [
  'jokes.authenticate',
  'jokes.auth',
  'jokes.home',
  'ngRoute'
])

.config(function ($routeProvider, $httpProvider) {

  $routeProvider
  .when('/signin', {
    templateUrl: 'app/auth/signin.html',
    controller: 'AuthController'
  })
  .when('/signup', {
    templateUrl: 'app/auth/signup.html',
    controller: 'AuthController'
  })
  .when('/', {
    templateUrl: 'app/home/home.html',
    controller: 'HomeController'
  })
  .when('/:type', {
    templateUrl: 'app/home/home.html',
    controller: 'HomeController'
  });

  $httpProvider.interceptors.push('AttachTokens');
})

.factory('AttachTokens', function ($window) {

    var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.database');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
