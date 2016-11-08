(function() {
    angular.module('app').directive('dirRetos', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/retos/dir-retos.html',
            controller: controller
        };
    });


    function controller($scope, $interval, $mdDialog, Individuales, Retos, Amigos) {

        $scope.view = 'retos-list';

        $scope.guardarRuta = function(recorridoActual) {
            Individuales.guardarRuta(recorridoActual).then(function(recorridoCreado) {
                console.log("recorridoCreado", recorridoCreado);
                return Retos.asociarRecorrido($scope.retoSelected.id, recorridoCreado.id);
            }).then(function(mensaje){
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Resultado registro de recorrido')
                    .textContent(mensaje)
                    .ariaLabel('Resultado registro')
                    .ok('Aceptar')
                );
                refreshRanking();
            });
        };

        refresh();

        function refresh() {
            Retos.getAll().then(function(retos) {
                $scope.retos = retos;
                console.log("Retos: ", retos);
            });
        }

        $scope.$watch('retoSelected', refreshRanking);
        function refreshRanking(){
            if($scope.retoSelected){
                Retos.getRanking($scope.retoSelected.recorrido.id).then(function(retosRanking){
                    $scope.retosRanking = retosRanking;
                });
            }
        }
        $scope.dateFormat = function(fecha) {
            return moment(fecha).format('dddd, DD [de] MMMM [a las] hh:mm a');
        };

        $scope.setRetoActual = function(reto) {
            /*$scope.recorridoActual = {
                ruta: []
            };*/
            $scope.retoSelected = reto;
            $scope.view = 'mapa';

        };



    }
})();
