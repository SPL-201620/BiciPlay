(function() {
    var app = angular.module('app');
    app.controller('IndividualesSharedCtrl', function($scope, $routeParams, Individuales) {
        $scope.view ="mapa";
        Individuales.get($routeParams.idRecorrido).then(function(recorrido){
            $scope.recorridoActual = recorrido;

            console.log($scope.recorridoActual);
        });
    });
})();
