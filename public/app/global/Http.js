(function() {
	angular.module('app').service('Http', function httpService($location, $http, EventHandler) {
		var errorListeners = [];
		this.serverUrl = 'http://localhost:9000/api/';
		this.post = function(relativRoute, body) {
			dev("POST" + this.serverUrl + relativRoute);
			return $http.post(this.serverUrl + relativRoute, body).error(EventHandler.error);
		};
		this.get = function(relativRoute) {
			dev("GET" + this.serverUrl + relativRoute);
			return $http.get(this.serverUrl + relativRoute).error(EventHandler.error);
		};

		function dev(message){
			console.log("HTTP:" +message);
		}
	});
})();
