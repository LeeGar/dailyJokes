angular.module('jokes.home', [])

.controller('HomeController', function ($scope, $location, allJokes) {
  $scope.jokes = {};

  $scope.getAllJokes = function () {
    allJokes.getAllJokes
  };

  $scope.getTodaysJoke = function () {
    
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

  var like = function (target) {
    console.log('liked!')
    //increment the counter for the target joke's likes
  }

  var dislike = function (target) {
    console.log('disliked!')
    //increment the counter for the target joke's dislikes
  }

  return {
    getAllJokes: getAllJokes,
    like: like,
    dislike: dislike
  }
});

