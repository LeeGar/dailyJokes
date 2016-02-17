angular.module('jokes.add', [])

.controller('JokeController', function ($scope, Jokes) {
  $scope.joke = {};

  $scope.addJoke = function () {
    $scope.joke.likes = 0;
    $scope.joke.dislikes = 0;

    Jokes.create($scope.joke);
  }


})

.factory('Jokes', function ($http) {
  
  var create = function (data) {
    console.log('whats the data: ', data)
    $http({
      method: 'POST',
      url: '/jokes/jokes/',
      data: data
    }).then(function (res) {
      //console.log('res is: ', res);
    })
  };

  return {
    create: create
  };
});