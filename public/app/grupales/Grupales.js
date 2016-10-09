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
            for (var i = 0; i < recorridos.length; i++) {
              var recorrido = recorridos[i];
                console.log("transfoming date: ", moment(recorrido.fechaRecorrido).toDate());
                recorrido.fechaRecorrido = moment(recorrido.fechaRecorrido);
                recorrido.ruta = [];
            }
            console.log("Recorridos ------- : ", recorridos);

            return recorridos;
        });
    };

    self.guardarRuta  = function(recorridoId, ubicaciones){
        var datosPost = {
            id: recorridoId,
            ubicaciones: ubicaciones
        };
        console.log("DATOS POST:", datosPost);
        return Http.post('recorridos/ingresarUbicaciones', datosPost).then(function(res) {
            return res.data;
        });
    };

});
