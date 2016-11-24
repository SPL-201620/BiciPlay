/*jslint node: true */
angular.module('app').service('Reporte', function($rootScope, $window, $location, Http) {
    var self = this;

    self.darReporte = function(fecha) {
        console.log("Se guarda el recorrido", recorrido);
        return Http.post('reportes/', {
            fecha: fecha
        });
    };

    self.darRecorridos = function(numero) {
        return Http.get('reportes/individuales/' + numero);
    };
});
