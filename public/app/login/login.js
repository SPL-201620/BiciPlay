var app = angular.module('app');

app.controller('LoginCtrl', function($rootScope, $scope, $http, $location,$timeout, $route, $mdDialog, User, EventHandler) {

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
    $scope.loginFacebook = function(){
        User.loginFacebook().then(function () {
          $route.reload();
        });
    };
    $scope.loginGoogle = function(){
        User.loginGoogle().then(function () {
          $route.reload();
        });
    };


    $scope.registrar = function(credenciales){
        User.registrar(credenciales).then(function () {
          $route.reload();
        });
    };
    $scope.seleccionarImagen = true;
    $scope.$watch('seleccionarImagen',function(nuevoValor){
      $timeout(function(){
          $scope.seleccionarImagenRestrasado= nuevoValor;
      }, 250);

    });

    $scope.keyUpListener = function($event, credenciales) {
        if ($event.keyCode === 13) {
          if($scope.showRegistro)
            $scope.login(credenciales);
          else
            $scope.login(credenciales);
        }
    };

    var fotos = [];
    for(var i= 0; i<5 ; i++){
      fotos.push('img/avatar' + (i+1) + '.png');
    }
    $scope.fotos = fotos;
    $scope.seleccionarFoto = function(foto){
      $scope.userRegistro.foto = foto;
    };
    $scope.userRegistro = {
      foto: fotos[0]
    };




});
