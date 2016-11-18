/*jslint node: true */
angular.module('app').service('Configurador', function($rootScope, $window, $location, Http) {
    var self = this;
    self.getConfigurations = function() {
        return [{
            name: 'Marco',
            options: [{
                img: 'img/bici/marco2.jpg',
                name: 'Marco sencillo'
            }, {
                img: 'img/bici/marco1.jpg',
                name: 'Marco carbono'
            }]
        }, {
            name: 'Attacco',
            options: [{
                img: 'img/bici/attacco1.jpg',
                name: 'Attacco sencillo'
            }, {
                img: 'img/bici/attacco2.jpg',
                name: 'Attacco carbono'
            }, {
                img: 'img/bici/attacco3.jpg',
                name: 'Attacco delux'
            }]
        }, {
            name: 'Pedales',
            options: [{
                img: 'img/bici/pedales1.jpg',
                name: 'Chocles + normales'
            }, {
                img: 'img/bici/pedales2.jpg',
                name: 'Chocles carrera'
            }, {
                img: 'img/bici/pedales3.jpg',
                name: 'Chocles montaña'
            }]
        }, {
            name: 'Rines',
            options: [{
                img: 'img/bici/ruedas2.jpg',
                name: 'Rines de 26"'
            }, {
                img: 'img/bici/ruedas1.jpg',
                name: 'Rines de 29"'
            }]
        }, {
            name: 'Zapatillas',
            options: [{
                img: 'img/bici/zapatillas1.jpg',
                name: 'Chocles montaña'
            }, {
                img: 'img/bici/zapatillas2.jpg',
                name: 'Chocles carrera'
            }]
        }, {
            name: 'Accesorios',
            options: [{
                img: 'img/bici/luces.jpg',
                name: 'Luces'
            }, {
                img: 'img/bici/guardabarros.jpg',
                name: 'Guardabarros'
            }]
        }];
    };
    self.validate = function(receptorId, mensaje) {
        return Http.post('chat/enviarMensaje', {
            receptor: receptorId,
            mensaje: mensaje
        });
    };
});
