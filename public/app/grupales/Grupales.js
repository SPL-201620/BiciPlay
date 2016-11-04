/*jslint node: true */
angular.module('app').service('Grupales', function($rootScope, $window, $location, Http) {
    var self = this;

    self.guardar = function(recorrido) {
        console.log("Se guarda el recorrido", recorrido);
        return Http.post('recorridos/crearRecorrido', recorrido).then(function(data) {
            var recorrido = transformarRecorrido(data);
            console.log("Recorrido Guardado y Transformado: ",recorrido );
            return recorrido;
        });
    };

    self.darRecorridos = function() {
        return Http.get('recorridos/darRecorridos').then(function(data) {
            var recorridos = data;
            for (var i = 0; i < recorridos.length; i++) {
                transformarRecorrido(recorridos[i]);

            }
            console.log("Recorridos ------- : ", recorridos);

            return recorridos;
        });
    };

    self.guardarRuta = function(recorridoId, ubicaciones) {
        var datosPost = {
            id: recorridoId,
            ubicaciones: ubicaciones
        };
        console.log("DATOS POST:", datosPost);
        return Http.post('recorridos/ingresarUbicaciones', datosPost);
    };

    function transformarRecorrido(recorrido) {
        recorrido.fechaRecorrido = moment(recorrido.fechaRecorrido);
        recorrido.ruta = [];
        if(!recorrido.ubicaciones){
            recorrido.ubicaciones = [];
        }
        return recorrido;
    }

});
