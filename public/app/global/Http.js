(function() {
	angular.module('app').service('Http', function httpService($location, $http, EventHandler) {
		var errorListeners = [];
		this.serverUrl = 'http://localhost:9000/api/';
		this.post = function(relativRoute, body) {
			return $http.post(this.serverUrl + relativRoute, body).error(EventHandler.error);
		};
		this.get = function(relativRoute) {
			return $http.get(this.serverUrl + relativRoute).error(EventHandler.error);
		};
	});
})();
