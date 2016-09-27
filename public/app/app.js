var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, User) {
    var deferred = $q.defer();
    User.checkLoggedin(function(user) {
      console.log("user:", user);
        if (user === '0') {
            $timeout(function() {
                deferred.reject();
            }, 0);
            if ($location.url() !== '/') {
                $location.url('/');
            }
        } else {
            $timeout(deferred.resolve, 0);
            console.log("Usurario:", user)
            $location.url('/main');
        }
    });
};

var app = angular.module('app', ['ngRoute', 'ngMaterial', 'ui.ace']);

app.config(function($routeProvider, $httpProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    moment.locale('es');
    $routeProvider
        .when('/', {
            controller: 'LoginCtrl',
            templateUrl: 'app/login/login.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .when('/main', {
            controller: 'ApuestasCtrl',
            templateUrl: 'app/apuestas/apuestas.html',
            /*resolve: {
            	loggedin: checkLoggedin
            }*/
        })
        .when('/sorteos', {
            controller: 'SorteosCtrl',
            templateUrl: 'app/sorteos/sorteos.html',
            /*resolve: {
            	loggedin: checkLoggedin
            }*/
        })
        .otherwise({
            controller: 'LoginCtrl',
            templateUrl: 'app/login/login.html',
            /*resolve: {
                loggedin: checkLoggedin
            }*/
        });
});
