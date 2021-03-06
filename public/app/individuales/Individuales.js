/*jslint node: true */
angular.module('app').service('Individuales', function($rootScope, $window, $location, Http) {
    var self = this;
    self.guardarRuta = function(recorridoInd){
        console.log("Guardando ruta: ", recorridoInd);
        return Http.post('recorridos/registrarRecorrido', recorridoInd);
    };

    self.darRecorridos = function(){
        return Http.get('recorridos/darRecorridosIndividuales');
    };

    self.get = function(recorridoId){
        return Http.get('recorridos/individuales/' + recorridoId);
    };
});
