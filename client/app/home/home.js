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

  $scope.sendMessage = function () {
    allJokes.sendMessage();
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

var todaysJoke = Math.floor(Math.random() * 30)
var joke = '';

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
     
     joke = res.data.jokes[todaysJoke];
      return cb(joke.message);
    });
  }

  var like = function (target) {
    console.log('liked!')
    return $http({
      method: 'POST',
      url: '/jokes/jokes/like',
      data: [joke.message, 'like']
    })
  }

  var dislike = function (target) {
    console.log('disliked!')
    return $http({
      method: 'POST',
      url: '/jokes/jokes/dislike',
      data: [joke.message, 'dislike']
    })
  }

  var sendMessage = function () {
    console.log('sending text...')
    $http({
      method: 'POST',
      url: '/jokes/users/',
      data: [todaysJoke, 'send']
    }).then(function (res) {
      console.log('message successful to ', res.data);

    })
  }

  return {
    getAllJokes: getAllJokes,
    getTodaysJoke: getTodaysJoke,
    like: like,
    dislike: dislike,
    sendMessage: sendMessage
  }

});

