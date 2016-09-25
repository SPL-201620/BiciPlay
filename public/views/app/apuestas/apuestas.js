(function() {

    angular.module('app').controller('ApuestasCtrl', Ctrl);

    function Ctrl($scope, $rootScope, $mdDialog, Apuesta) {
        $scope.determinate = true;
        $scope.mensaje = "";
        $scope.$watch("apuestasFile", function(apuestasFile) {
            if (apuestasFile) {
                $scope.mensaje = "Subiendo archivo...";
                $scope.loadingStatus = 0;
                console.log("Ha seleccionado el archivo: ", apuestasFile);
                $scope.determinate = true;
                Apuesta.upload(apuestasFile, function(evt) {

                    $scope.loadingStatus = 100.0 * evt.loaded / evt.total;
                    if ($scope.loadingStatus === 100){
                      $scope.determinate = false;
                      $scope.mensaje = "Cargando...";
                    }
                    console.log("Loading:", $scope.loadingStatus);
                }, function(data) {
                    $scope.determinate = true;
                    $scope.loadingStatus = 100.0;
                    console.log("End:", $scope.loadingStatus, data);

                    $scope.mensaje = "Se cargaron " + data.cargados + " registros de los " + data.total+ " que estaban en el archivo " + apuestasFile.name + ". Se rigistraron " + data.errors.length + "erroes:";
                    $scope.errores = data.errors;
                });
            }
        });

    }
})();
