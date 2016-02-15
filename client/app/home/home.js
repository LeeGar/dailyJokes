angular.module('jokes.home', [])

.controller('HomeController', function ($scope, allJokes) {
  $scope.jokes = {};


  $scope.getAllJokes = function () {
    allJokes.getAllJokes
  };

  $scope.destroytoken = function () {
    Auth.signout();
  };

  

})

.factory('allJokes', function ($http) {

  var getAllJokes = function () {
    return $http({
      method: 'GET',
      url: 'jokes/jokes'
    }).then(function (res) {
      return res.data;
    }).catch(function (error) {
      console.error(error);
    });
  }

  return {
    getAllJokes: getAllJokes
  };
});

