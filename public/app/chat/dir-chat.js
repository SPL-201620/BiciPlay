(function() {
    angular.module('app').directive('dirChat', function() {
        return {
            restrict: 'E',
            scope: {
              amigo: "="
            },
            templateUrl: 'app/chat/dir-chat.html',
            controller: controller
        };
    });


    function controller($scope, Chat) {



    }
})();
