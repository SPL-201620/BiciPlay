(function() {
    angular.module('app').directive('dirIndividuales', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/individuales/dir-individuales.html',
            controller: controller
        };
    });


    function controller($scope, $interval, $mdDialog, Individuales, Retos, Amigos, User) {
        $scope.view = "mapa";
        $scope.recorridoActual = {};
        $scope.guardarRuta = function(recorridoActual) {
            Individuales.guardarRuta(recorridoActual).then(function() {
                refresh();
            });
        };
        $scope.dateFormat = function(fecha) {
            return moment(fecha).format('dddd, DD [de] MMMM [a las] hh:mm a');
        };
        $scope.setRecorridoActual = function(recorrido) {
            $scope.recorridoActual = recorrido;
        };
        refresh();

        function refresh() {
            Individuales.darRecorridos().then(function(recorridos) {
                console.log("Recorridos: ", recorridos);
                $scope.recorridos = recorridos;
                if ($scope.recorridoActual.id) {
                    $scope.recorridoActual = $scope.recorridos.filter(function(recorrido) {
                        return recorrido.id === $scope.recorridoActual.id;
                    }[0]);
                }

            });
        }

        $scope.showRetosDialog = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/individuales/retos-dialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: false // Only for -xs, -sm breakpoints.
                })
                .then(function(amigos) {

                    amigos.forEach(function(amigo){
                        if (amigo.selected){
                            Retos.retarAmigo(  $scope.recorridoActual.id, amigo.id);
                        }
                    });
                }, function() {
                    // Se cancela el dialogo.
                });
        };

        /**
         * Controlador para el diálogo que se encarga de la carga de un proyecto
         */
        function DialogController($scope, $mdDialog) {
            Amigos.getAmigos().then(function(amigosP) {
                $scope.amigos = amigosP;
            });

            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.retarSeleccionados = function() {
                $mdDialog.hide($scope.amigos);
            };
            $scope.mostrar = function(persona) {
                return $scope.busqueda ? (persona.name.includes($scope.busqueda) || persona.email.includes($scope.busqueda)) : true;
            };
        }


        $scope.share = function(recorridoActual){
            recorridoActual.shared = true;
            return User.shareIndividual(recorridoActual).then(function(){

            }, function(){
                recorridoActual.shared = false;
                console.log("Error: Ocurrió un problema al intentar compartir");
            });
        };




    }
})();
