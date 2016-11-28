/*jslint node: true */
angular.module('app').service('Reporte', function($rootScope, $window, $location, Http) {
    var self = this;

    self.darReporte = function(tipoReporte) {
        console.log("Se pide un reporte de:", tipoReporte);
        return Http.post('reportes/list', {
            tipo: tipoReporte
        });
    };

    self.darRecorridos = function(numero) {
        return Http.get('reportes/individuales/' + numero);
    };

    self.darTipos = function(){
        return Http.get('reportes/tipos');
    };
});
