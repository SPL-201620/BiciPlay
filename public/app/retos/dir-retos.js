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


        refresh();

        function refresh() {
            Retos.getAll().then(function(retos) {
                $scope.retos = retos;
                console.log("Retos: ", retos);
            });
        }



    }
})();
