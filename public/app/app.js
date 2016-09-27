var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, User) {
    var deferred = $q.defer();
    User.checkLoggedin().then(function(user) {
        if (user) {
            $timeout(deferred.resolve, 0);
            console.log("Usurario:", user);
            $location.url('/main');

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
