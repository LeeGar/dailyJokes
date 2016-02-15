angular.module('jokes.authenticate', [])
  
.controller('AuthController', function ($scope, $window, $location, Auth) {

  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.jokes', token);
        $location.path('/home');
      })
      .catch(function (error) {
        console.error(error);
        $scope.user.password = '';
        $scope.user.username = '';
        $scope.user.phonenumber = '';
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.jokes', token);
        $location.path('/home');
      })
      .catch(function (error) {
        console.error(error);
        $scope.user.password = '';
        $scope.user.username = '';
        $scope.user.phonenumber = '';
      });
  };

})

.factory('Auth', function ($http, $location, $window) {

  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/jokes/user/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/jokes/user/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.jokes');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.jokes');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});