/*jslint node: true */
angular.module('app').service('User', userService);

function userService($rootScope, $window, $location, $http, EventHandler) {
    var user = null;
    var self = this;


    self.getUser = function() {
        return user;
    };
    self.login = function(userLogin, callback) {
        $http.post('/login', userLogin).success(function(data, status, headers, config) {
            user = data;
            callback();
        }).error(EventHandler.error);
    };
    self.checkLoggedin = function(userLogin) {
        $http.get('/loggedin').success(function(data, status, headers, config) {
            if (data !== '0') {
                user = data;
            }
        });
    };
    self.logout = function() {
        $http.post('/logout', {}).success(function(data, status, headers, config) {
            user = data;
        }).error(EventHandler.error);
    };
}
