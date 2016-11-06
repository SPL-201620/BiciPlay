/*jslint node: true */
angular.module('app').service('Retos', function($rootScope, $window, $location, Http) {
    var self = this;
    self.retarAmigo = function(recorridoId, amigoId){

        console.log("Retando a ", amigoId, recorridoId)
        return Http.post('retos', {
            recorridoId: recorridoId,
            retadoId: amigoId
        }).then(function(retoGuardado){
            console.log("retoGuardado", retoGuardado);
        });
    };

});
