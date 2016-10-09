(function(){
  angular.module('app').directive('dirIndividuales', function() {
  	return {
  		restrict: 'E',
  		scope: {
  		},
  		templateUrl: 'app/individuales/dir-individuales.html',
  		controller: controller
  	};
  });


  function controller($scope, $timeout, Individuales) {
    $scope.view = "mapa";


  }
})();
