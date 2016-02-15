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

});