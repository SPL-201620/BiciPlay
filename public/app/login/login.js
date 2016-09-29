var app = angular.module('app');

app.controller('LoginCtrl', function($rootScope, $scope, $http, $location, $route, $mdDialog, User, EventHandler) {

    $scope.userLogin = {};

    $scope.login = function(credenciales) {
        var errorMessage = null;
        var username = credenciales.username;
        var password = credenciales.password;

        if (username && username !== "" && username !== null && password && password !== "" && password !== null) {
          User.login(credenciales).then(function () {
            $route.reload();
          });
        }
    };

    $scope.registrar = function(credenciales){
        User.registrar(credenciales);
    };

    $scope.keyUpListener = function($event, credenciales) {
        if ($event.keyCode === 13) {
          if($scope.showRegistro)
            $scope.login(credenciales);
          else
            $scope.login(credenciales);
        }
    };


});
