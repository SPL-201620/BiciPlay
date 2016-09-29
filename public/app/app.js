var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, User) {
    var deferred = $q.defer();
    User.checkLoggedin().then(function(user) {
        if (user) {
            $timeout(deferred.resolve, 0);
            console.log("Usurario:", user);
            $location.url('/home');

        } else {
            console.log("El usuario no se encuentra logueado:");
            $timeout(function() {
                deferred.reject();
            }, 0);
            if ($location.url() !== '/') {
                $location.url('/');
            }
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
        .when('/home', {
            controller: 'HomeCtrl',
            templateUrl: 'app/home/home.html',
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
