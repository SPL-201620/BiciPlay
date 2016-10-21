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


  function controller($scope, $interval, Individuales) {
    $scope.view = "mapa";
    $scope.recorridoActual = {};
    $scope.guardarRuta = function(recorridoActual){
        Individuales.guardarRuta(recorridoActual);
    };




  }
})();
