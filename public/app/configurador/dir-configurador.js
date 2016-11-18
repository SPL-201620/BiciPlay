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




    }
})();
