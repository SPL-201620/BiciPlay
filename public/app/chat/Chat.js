/*jslint node: true */
angular.module('app').service('Chat', function ($rootScope, $window, $location, Http) {
    var self = this;
    self.darMensajes = function(amigoId) {
        return Http.post('chat/leerMensaje', {
          receptor: amigoId
        }).then(function(res) {
            return res.data;
        });
    };
    self.enviarMensaje = function(receptorId, mensaje) {
        return Http.post('chat/enviarMensaje', {
          receptor: receptorId,
          mensaje: mensaje
        }).then(function(res) {
            return res.data;
        });
    };
});
