(function() {
    angular.module('app').directive('dirReportes', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/reportes/dir-reportes.html',
            controller: controller
        };
    });


    function controller($scope, $timeout, Reporte) {
        $scope.nombreReporte = "Hola Mundo ";

    }
})();
