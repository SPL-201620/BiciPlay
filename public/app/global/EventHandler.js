(function() {
	angular.module('app').service('EventHandler', function errorHandler($location, $http) {
		var errorListeners = [];
		this.error = function(url) {

			function handler (error, status, headers, config) {

				if (status == 404) {
					console.log("404 Not Found: " + url);
				} else {
					console.log("Error status : ", status, "error", error);
					for (var i = errorListeners.length - 1; i >= 0; i--) {
						errorListeners[i](error, status);
					}
				}
			}
			return handler;
		};
		this.addErrorListener = function(callback) {
			errorListeners.push(callback);
		};
	});
})();
