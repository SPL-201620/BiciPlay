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
      $scope.recorridoActual = null;
      Grupales.guardar(recorrido).then(function(recorridoP){
          console.log("Recorrido Creado P :", recorridoP);
        $scope.recorridoActual = recorridoP;
        $scope.showMapa = true;
        $scope.showFormulario = false;
        refresh();
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
    $scope.goBack = function(){
      console.log("GO BACK");
      $scope.recorridoActual = null;
      $scope.showMapa = false;
      $scope.showFormulario = false;
    };
    refresh();
    function refresh (){
      Grupales.darRecorridos().then(function(recorridos){
        $scope.recorridos = recorridos;
        console.log("recorridos", recorridos);
      });
      Grupales.darProximosRecorridos().then(function(recorridos){
        $scope.proximosRecorridos = recorridos;
        console.log("proximosRecorridos", recorridos);
      });
      if($scope.recorridoActual && $scope.recorridoActual.id){
          Grupales.darRecorrido($scope.recorridoActual.id).then(function(recorrido){
              $scope.recorridoActual = recorrido;
          });
      }

    }

    $scope.unirseARecorridoGrupal = function(recorridoGId){
        Grupales.unirseARecorridoGrupal(recorridoGId).then(function(){
            refresh();
        });
    };

    $scope.guardarRuta = function(recorridoId, ubicaciones){
        Grupales.guardarRuta(recorridoId, ubicaciones).then(function(){
            refresh();
            $scope.showMapa = false;
        });
    };
    /*setInterval(function(){
      console.log("$scope.recorridoActual.ruta", $scope.recorridoActual.ruta);
    }, 4000);*/

  }
})();
