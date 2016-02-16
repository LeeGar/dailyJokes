angular.module('jokes.auth', [])
.factory('Auth', function ($http, $location, $window) {
  
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/jokes/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/jokes/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.database');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.database');
    $location.path('#/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
