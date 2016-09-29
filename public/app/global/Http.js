(function() {
	angular.module('app').service('Http', function httpService($location, $http, EventHandler) {
		var errorListeners = [];
		this.serverUrl = 'http://localhost:9000/api/';
		this.post = function(relativRoute, body) {
			var url = "POST " + this.serverUrl + relativRoute;
			dev(url);
			return $http.post(this.serverUrl + relativRoute, body).error(EventHandler.error(url));
		};
		this.get = function(relativRoute) {
			var url = "GET " + this.serverUrl + relativRoute;
			dev(url);
			return $http.get(this.serverUrl + relativRoute).error(EventHandler.error(url));
		};

		function dev(message){
			console.log("HTTP:" +message);
		}
	});
})();
