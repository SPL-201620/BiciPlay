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


  function controller($scope, $timeout) {
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

  }
})();
