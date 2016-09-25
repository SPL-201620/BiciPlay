(function() {
	angular.module('app').service('EventHandler', function errorHandler($location, $http) {
		var errorListeners = [];
		this.error = function(error, status, headers, config) {
			console.log("Error: ", status, error);
			if (!error.message && status == 401) {
				console.log("Setting message");
				error.message = "Falló la autenticación";
			}
			console.log("Error message: ", error);
			for (var i = errorListeners.length - 1; i >= 0; i--) {
				errorListeners[i](error, status);
			}
		};
		this.addErrorListener = function(callback) {
			errorListeners.push(callback);
		};
	});
})();