(function(){
  angular.module('app').directive('dirAmigos', function() {
  	return {
  		restrict: 'E',
  		scope: {
  		},
  		templateUrl: 'app/admin-horario/celdaHorarioReal.html',
  		controller: controller
  	};
  });


  function controller($scope, Amigos) {
  	Amigos.getAmigos().then(function(amigosP){
      $scope.amigos = amigosP;
    });

  }
})();
