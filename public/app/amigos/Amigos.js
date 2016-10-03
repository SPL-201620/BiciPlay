/*jslint node: true */
angular.module('app').service('Amigos', function ($rootScope, $window, $location, Http) {
    var self = this;
    self.getAmigos = function() {
        return Http.get('usuarios/darAmigos').then(function(res) {
            return res.data;
        });
    };
    self.buscarPersonas = function(nombre) {
        return Http.post('usuarios/buscarUsuarios', {
          name: nombre
        }).then(function(res) {
            return res.data;
        });
    };
    self.agregarAmigo = function(idPersona){
      return Http.post('usuarios/agregarAmigo', {
        id: idPersona
      }).then(function(res) {
          return res.data;
      });
    };
});
