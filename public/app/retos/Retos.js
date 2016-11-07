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

});
