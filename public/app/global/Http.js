/**
 * Servicio creado para facilitar peticiones HTTP al servidor
 */
(function() {
    angular.module('app').service('Http', function httpService($location, $http, EventHandler) {
        var errorListeners = [];
        /**
         * Url del servidor
         * @type {string}
         */
        this.serverUrl = $location.protocol() + '://'+ $location.host() ;
        this.serverPath = this.serverUrl + '/api/';
        //this.serverUrl = '/api/';
        /**
         * Método encargado de hacer peticiones HTTP Post
         * @param relativRoute Ruta relativa a donde realizar la petición
         * @param body Objeto a mandar en la petición HTTP
         * @returns {*}
         */
        this.post = function(relativRoute, body) {
            var url = "POST " + this.serverPath + relativRoute;

            return $http.post(this.serverPath + relativRoute, body, {
                withCredentials: true
            }).then(function(res) {
                dev(url, body, res.data);
                return res.data;
            }, EventHandler.error);
        };
        /**
         * Método encargado de realizar peticiones HTTP Get
         * @param relativRoute Ruta a donde se realizará la petición Get
         * @returns {*}
         */
        this.get = function(relativRoute) {
            var url = "GET " + this.serverPath + relativRoute;

            return $http.get(this.serverPath + relativRoute, {
                withCredentials: true
            }).then(function(res) {
                dev(url, null, res.data);
                return res.data;
            }, EventHandler.error);
        };

        /**
         * Método que hace logs en la consola JavaScript
         * @param message El mensaje a mostrar en la consola
         */
        function dev(message, body, response) {
            console.log("HTTP:" + message, body?body:"", "->", response);
        }
    });
})();
