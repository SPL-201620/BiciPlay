/*jslint node: true */
angular.module('app').service('Amigos', function ($rootScope, $window, $location, Http) {
    var self = this;
    self.getAmigos = function() {
        return Http.get('usuarios/amigos').then(function(res) {
            return res.data;
        });
    };
    self.buscarPersonas = function(nombre) {
        return Http.post('usuarios/buscar', {
          nombre: nombre
        }).then(function(res) {
            return res.data;
        });
    };
});
