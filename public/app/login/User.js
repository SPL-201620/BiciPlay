/*jslint node: true */
angular.module('app').service('User', function ($rootScope, $window, $location, Http) {
    var user = null;
    var self = this;


    self.getUser = function() {
        return user;
    };
    self.registrar = function (user){
      return Http.post('usuarios/registro', user).then(function(res) {
          user = res.data;
          return user;
      });
    };
    self.login = function(userLogin) {
        return Http.post('usuarios/login', userLogin).then(function(res) {
            user = res.data;
            return user;
        });
    };
    self.checkLoggedin = function() {
        return Http.get('usuarios/loggedin').then(function(res) {
            var data = res.data;
            console.log("Data", data);
            if (data !== '0') {
                user = data;
            }
            return user;
        });
    };
    self.logout = function() {
        return Http.post('usuarios/logout', {}).then(function(res) {
            user = null;
        });
    };
});
