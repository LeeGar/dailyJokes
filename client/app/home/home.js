angular.module('jokes.home', [])

.controller('HomeController', function ($scope, $location, allJokes, Auth) {
  $scope.display;
  var today;

  $scope.getAllJokes = function () {
    allJokes.getAllJokes();
  };

  $scope.getTodaysJoke = function () {
    allJokes.getTodaysJoke(function(res) {
      today = res;
      $scope.display = today;
    });
  };

  $scope.like = function () {
    allJokes.like();
  };

  $scope.dislike = function () {
    allJokes.dislike();
  };

  $scope.destroytoken = function () {
    Auth.signout();
  };

  $scope.getTodaysJoke();
})

.factory('allJokes', function ($http) {

var todaysJoke = 0;

  var getAllJokes = function () {
    return $http({
      method: 'GET',
      url: '/jokes/jokes/'
    }).then(function (res) {
      totalJokes = res.data;
      return res.data;
    }).catch(function (error) {
      console.error(error);
    });
  }

  var getTodaysJoke = function (cb) {
    return $http({
      method: 'GET',
      url: '/jokes/jokes/'
    }).then(function (res) {
     var joke = res.data.jokes[todaysJoke];
      return cb(joke.message);
    });
  }

  var like = function (target) {
    console.log('liked!')
    return $http({
      method: 'POST',
      url: '/jokes/jokes/',
      data: [todaysJoke]
    })
  }

  var dislike = function (target) {
    console.log('disliked!')
    //increment the counter for the target joke's dislikes
  }

  return {
    getAllJokes: getAllJokes,
    getTodaysJoke: getTodaysJoke,
    like: like,
    dislike: dislike
  }

});

