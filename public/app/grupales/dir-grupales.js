(function(){
  angular.module('app').directive('dirGrupales', function() {
  	return {
  		restrict: 'E',
  		scope: {
  		},
  		templateUrl: 'app/grupales/dir-grupales.html',
  		controller: controller
  	};
  });


  function controller($scope, $timeout, Grupales) {
    $scope.recorridoActual = null;
    $scope.unidadesFrecuencia = [{
      name: "días",
      value: "days"
    },{
      name: "semanas",
      value: "weeks"
    },{
      name: "meses",
      value: "months"
    },{
      name: "años",
      value: "years"
    }];
    $scope.guardar = function(recorrido){
      Grupales.guardar(recorrido).then(function(){
        $scope.showMapa = true;
      });
    };
    $scope.fechaFormat = function(fecha){
      return moment(fecha).format('dddd, DD [de] MMMM');
    };
    $scope.seleccionarRecorrido= function(recorrido){
      console.log("Seleccionando recorrido", recorrido);
      $scope.recorridoActual = recorrido;
      $scope.showMapa = true;
    };
    refresh();
    function refresh (){
      Grupales.darRecorridos().then(function(recorridos){
        $scope.recorridos = recorridos;
        console.log("recorridos", recorridos)
      });
    }
    /*setInterval(function(){
      console.log("$scope.recorridoActual.ruta", $scope.recorridoActual.ruta);
    }, 4000);*/

  }
})();
