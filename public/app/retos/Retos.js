/*jslint node: true */
angular.module('app').service('Retos', function($rootScope, $window, $location, Http) {
    var self = this;
    self.retarAmigo = function(recorridoId, amigoId){

        return Http.post('retos', {
            recorridoId: recorridoId,
            retadoId: amigoId
        });
    };

    self.getAll = function(){
        return Http.get('retos');
    };

    self.asociarRecorrido = function(retoId, recorridoId){
        return Http.post('retos/' + retoId + '/recorrido', {
            recorridoId: recorridoId
        });
    };
    self.getRanking = function(recorridoPropuestoId){
        return Http.get('ranking/' + recorridoPropuestoId).then(function(retosRanking){
            return retosRanking.sort(function(reto1, reto2){
                return reto1.recorridoRealizado.duracion - reto2.recorridoRealizado.duracion;
            });
        });
    };

});
