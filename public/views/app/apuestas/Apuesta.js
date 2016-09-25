(function() {
    angular.module('app').service('Apuesta', service);
    function service ($rootScope, $http, Upload, EventHandler ) {
        self = this;
        self.upload = function(file, progressCallback, endCallback) {
            Upload.upload({
                url: '/apuestas/file',
                fields: {},
                file: file
            }).progress(progressCallback).success(endCallback).error(EventHandler.error);
        };
    }
})();
