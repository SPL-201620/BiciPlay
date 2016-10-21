/*jslint node: true */
angular.module('app').service('Individuales', function($rootScope, $window, $location, Http) {
    var self = this;
    self.guardarRuta = function(recorridoInd){
        return Http.post('recorridos/registrarRecorrido', recorridoInd);
    };
});
