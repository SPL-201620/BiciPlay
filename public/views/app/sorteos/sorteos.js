(function() {

    angular.module('app').controller('SorteosCtrl', Ctrl);

    function Ctrl($scope, $rootScope, $mdDialog, Sorteo) {
      $scope.showForm = false;
			$scope.save = function (sorteo) {
			  Sorteo.save(sorteo, function () {
			     $scope.sorteo = {};
           $scope.showForm = false;
			  });
			};

    }
})();
