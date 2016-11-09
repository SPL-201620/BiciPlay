(function() {
    var app = angular.module('app');
    app.controller('IndividualesSharedCtrl', function($scope, $routeParams, Individuales) {
        Individuales.get($routeParams.idRecorrido).then(function(recorrido){
            $scope.recorridoActual = recorrido;
            $scope.view ="mapa";
            console.log($scope.recorridoActual);
        });
    });
})();
