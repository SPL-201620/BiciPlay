(function() {
    angular.module('app').directive('dirAmigos', function() {
        return {
            restrict: 'E',
            scope: {
              onSelect: "="
            },
            templateUrl: 'app/amigos/dir-amigos.html',
            controller: controller
        };
    });


    function controller($scope, Amigos) {
        $scope.$watch('busqueda', function(busqueda) {
            if (!busqueda || busqueda === "") {
              $scope.personas = null;
            }
        });
        refreshAmigos();

        $scope.buscarPersonas = function(nombre) {
            Amigos.buscarPersonas(nombre).then(function(personas) {
                $scope.personas = personas;
            });
        };
        $scope.agregarAmigo = function(persona){
          Amigos.agregarAmigo(persona.id).then(function(personas) {
              refreshAmigos();
          });
        };
        function refreshAmigos(){
          Amigos.getAmigos().then(function(amigosP) {
              $scope.amigos = amigosP;
          });
        }


    }
})();
