/*jslint node: true */
angular.module('app').service('User', function ($rootScope,$route, $window, $location, Http, Facebook, Google) {
    var user = null;
    var self = this;
    var callbacks = [];


    self.getUser = function() {
        return user;
    };
    self.getUserCallback = function(callback){
      callbacks.push(callback);
    };

    self.registrar = function (user){
      return Http.post('usuarios/registro', user).then(function(userP) {
          user = userP;
          return user;
      });
    };
    self.login = function(userLogin) {
        return Http.post('usuarios/login', userLogin).then(function(userP) {
            user = userP;
            return user;
        });
    };

    self.loginFacebook = function(){
        return Facebook.login().then(function(facebookUser){
            return Http.post('usuarios/loginFacebook', facebookUser).then(function(userP) {
                user = userP;
                return user;
            });
        });
    };

    self.loginGoogle = function(){
        return Google.login().then(function(googleUser){
            return Http.post('usuarios/loginFacebook', googleUser).then(function(userP) {
                user = userP;
                return user;
            });
        });
    };

    self.checkLoggedin = function() {
        return Http.get('usuarios/loggedin').then(function(userP) {
            if (userP !== 'null') {
                user = userP;
            }
            callbacks.forEach(function(callback){
              callback(user);
          });
            return user;
        });
    };
    self.logout = function() {
        return Http.get('usuarios/logout').then(function() {
            user = null;
            $route.reload();
        });
    };
});
