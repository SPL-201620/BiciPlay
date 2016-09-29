(function(){
  angular.module('app').directive('dirAmigos', function() {
  	return {
  		restrict: 'E',
  		scope: {
  		},
  		templateUrl: 'app/amigos/dir-amigos.html',
  		controller: controller
  	};
  });


  function controller($scope, Amigos) {
  	Amigos.getAmigos().then(function(amigosP){
      $scope.amigos = amigosP;
    });

  }
})();
