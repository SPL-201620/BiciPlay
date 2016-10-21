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
        Individuales.guardarRuta(recorridoActual).then(function(){
            refresh();
        });
    };
    $scope.dateFormat = function(fecha){
        return moment(fecha).format('dddd, DD [de] MMMM [a las] hh:mm a');
    };
    $scope.setRecorridoActual = function(recorrido){
        $scope.recorridoActual = recorrido;
    };
    refresh();
    function refresh (){
        Individuales.darRecorridos().then(function(recorridos){
            console.log("Recorridos: ", recorridos);
            $scope.recorridos = recorridos;
        });
    }




  }
})();
