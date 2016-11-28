/*jslint node: true */
angular.module('app').service('Configurador', function($rootScope, $window, $location, Http) {
    var self = this;
    self.getConfigurations = function() {
        return [{
            name: 'Marco',
            options: [{
                img: 'img/bici/marco2.jpg',
                name: 'Marco sencillo',
                id: "Marco_Sencillo"
            }, {
                img: 'img/bici/marco1.jpg',
                name: 'Marco carbono',
                id: 'Marco_Carbono'
            },{
                name: 'Ninguno',
                img: 'img/bici/ninguno.png'
            }
            ]
        }, {
            name: 'Timon',
            options: [{
                img: 'img/bici/manubrio1.png',
                name: 'Timon Carreras',
                id: "Timon_Carreras"
            }, {
                img: 'img/bici/manubrio2.png',
                name: 'Manubrio Simple',
                id: "Timon_Simple"
            },{
                name: 'Ninguno',
                img: 'img/bici/ninguno.png'
            }]
        },{
            name: 'Attacco',
            options: [{
                img: 'img/bici/attacco1.jpg',
                name: 'Attacco sencillo',
                id:'Attacco_Sencillo'
            }, {
                img: 'img/bici/attacco2.jpg',
                name: 'Attacco carbono',
                id: "Attacco_Carbono"
            }, {
                img: 'img/bici/attacco3.jpg',
                name: 'Attacco delux',
                id: 'Attacco_Delux'
            },{
                name: 'Ninguno',
                img: 'img/bici/ninguno.png'
            }]
        }, {
            name: 'Tenedor',
            options: [{
                img: 'img/bici/tenedor1.jpg',
                name: 'Tenedor Trigon',
                id: 'Tenedor_Trigon'
            }, {
                img: 'img/bici/tenedor2.jpg',
                name: 'Tenedor Meijun',
                id:'Tenedor_Meijun'
            }]
        },{
            name: 'Pedales',
            options: [{
                img: 'img/bici/pedales1.jpg',
                name: 'Chocles + normales',
                id: 'Chocles_Normales'

            }, {
                img: 'img/bici/pedales2.jpg',
                name: 'Chocles carrera',
                id: 'Chocles_Carrera'
            }, {
                img: 'img/bici/pedales3.jpg',
                name: 'Chocles montaña',
                id: 'Chocles_Montana'
            },{
                name: 'Ninguno',
                img: 'img/bici/ninguno.png'
            }]
        }, {
            name: 'Rines',
            options: [{
                img: 'img/bici/ruedas2.jpg',
                name: 'Rines de 26"',
                id: 'Rines_26'
            }, {
                img: 'img/bici/ruedas1.jpg',
                name: 'Rines de 29',
                id: 'Rines_29'

            },{
                name: 'Ninguno',
                img: 'img/bici/ninguno.png'
            }]
        }, {
            name: 'Frenos',
            options: [{
                img: 'img/bici/frenos1.jpg',
                name: 'Frenos  Durace',
                id: 'Frenos_Durace'
            }, {
                img: 'img/bici/frenos2.jpg',
                name: 'Frenos Sencillos',
                id: 'Frenos_Sencillos'
            },{
                name: 'Ninguno',
                img: 'img/bici/ninguno.png'
            }]
        },{
            name: 'Cambios',
            options: [{
                img: 'img/bici/cambios.jpg',
                name: 'Cambios Shimano',
                id: 'Cambios_Shimano'
            }, {
                img: 'img/bici/cambios2.jpg',
                name: 'Cambios deore',
                id: 'Cambios_Deore'
            },{
                name: 'Ninguno',
                img: 'img/bici/ninguno.png'
            }]
        }, {
            name: 'Accesorios',
            options: [{
                img: 'img/bici/luces.jpg',
                name: 'Luces',
                id: 'Luces'
            },{
                name: 'Ninguno',
                img: 'img/bici/ninguno.png'
            }]
        },{
            name: 'Accesorios',
            options: [ {
                img: 'img/bici/guardabarros.jpg',
                name: 'Guardabarros',
                id: 'Guardabarros'


            },{
                name: 'Ninguno',
                img: 'img/bici/ninguno.png'
            }]
        }
        ];
    };
    self.validate = function(receptorId, mensaje) {
        return Http.post('chat/enviarMensaje', {
            receptor: receptorId,
            mensaje: mensaje
        });
    };

    self.validarConfiguracion = function(seleccionadas) {
        var datosPost = {
            configuracion:seleccionadas.toString()
        };
        console.log("DATOS POST para validar configuraciones:", datosPost );

        console.log("validar daros:", seleccionadas );
        return Http.post('recorridos/configuracion', datosPost);
    };




});
