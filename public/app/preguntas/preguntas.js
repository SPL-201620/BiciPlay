(function() {
    angular.module('app').controller('PreguntasCtrl', function ($scope, Pregunta) {
        $scope.pregunta={
            "numero":1,
            "enunciado":"Esto es un mock del enunciado de una pregunta",
            "porcentaje":20
        }
    });
})();