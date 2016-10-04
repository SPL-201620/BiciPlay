/*jslint node: true */
angular.module('app').service('Grupales', function($rootScope, $window, $location, Http) {
    var self = this;

    self.guardar = function(recorrido) {
        console.log("Se guarda el recorrido", recorrido);
        return Http.post('recorridos/crearRecorrido', recorrido).then(function(res) {
            return res.data;
        });
    };

    self.darRecorridos = function() {
        return Http.get('recorridos/darRecorridos').then(function(res) {
            var recorridos = res.data;
            for (var recorrido in recorridos) {
                console.log("transfoming date: ", moment(recorrido.fechaRecorrido).toDate());
                recorrido.fechaRecorrido = moment(recorrido.fechaRecorrido);
            }

            return recorridos;
        });
    };

});
