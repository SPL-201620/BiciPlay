(function() {
    angular.module('app').directive('dirConfigurador', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/configurador/dir-configurador.html',
            controller: controller
        };
    });




    function controller($scope, $interval, $mdDialog, Individuales, Configurador) {
        $scope.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
        $scope.configs = Configurador.getConfigurations();


        $scope.validarConfiguracion = function(configs){
            var seleccionadas= configs.map(function(config){
                return (config.selected && config.selected.name!= "Ninguno"?config.name:null) ;

            }).filter(function(seleccionada){
                return seleccionada;
            }).concat(configs.map(function(config){
                return (config.selected && config.selected.name!= "Ninguno"?config.selected.id:null) ;

            }).filter(function(seleccionada){
                return seleccionada;
            })).concat("Configurador");

            seleccionadas.sort();

            seleccionadas=eliminateDuplicates(seleccionadas);
            function eliminateDuplicates(seleccionadas) {
                var i,
                    len=seleccionadas.length,
                    out=[],
                    obj={};

                for (i=0;i<len;i++) {
                    obj[seleccionadas[i]]=0;
                }
                for (i in obj) {
                    out.push(i);
                }
                return out;
            }


            Configurador.validarConfiguracion(seleccionadas).then(function(respuesta){
                if(respuesta === "ok" ){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Configuracion Correcta')
                            .textContent('Configuracion Correcta')
                            .ariaLabel('Alert Dialog')
                            .ok('Aceptar')
                    )
                }
                else {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Mensaje de error')
                            .textContent('Configuracion Incorrecta')
                            .ariaLabel('Alert Dialog')
                            .ok('Aceptar')
                    )


                }

            });


        };




    }
})();
