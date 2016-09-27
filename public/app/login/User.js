/*jslint node: true */
angular.module('app').service('User', userService);

function userService($rootScope, $window, $location, Http) {
    var user = null;
    var self = this;


    self.getUser = function() {
        return user;
    };
    self.login = function(userLogin, callback) {
        Http.post('usuarios/loggedin', userLogin).then(function(res) {
            user = res.data;
            callback();
        });
    };
    self.checkLoggedin = function(callback) {
        Http.get('usuarios/loggedin').then(function(res) {
            var data = res.data;
            console.log("Data", data)
            if (data !== '0') {
                user = data;
            }
            callback(data);
        });
    };
    self.logout = function() {
        Http.post('/logout', {}).then(function(res) {
            user = data;
        });
    };
}
