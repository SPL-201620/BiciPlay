(function() {
    angular.module('app').directive('dirChat', function() {
        return {
            restrict: 'E',
            scope: {
                amigo: "=",
                goBack: "="
            },
            templateUrl: 'app/chat/dir-chat.html',
            controller: controller
        };
    });


    function controller($scope, Chat, User) {
        $scope.yo = User.getUser();
        console.log("YO: ", $scope.yo);
        refreshMensajes();
        $scope.enviarMensaje = function(mensaje) {
            Chat.enviarMensaje($scope.amigo.id, mensaje).then(function() {
                $scope.nuevoMensaje = "";
                refreshMensajes();
            });
        };

        $scope.keyUpListener = function($event, mensaje) {
            if ($event.keyCode === 13) {
                $scope.enviarMensaje(mensaje);
            }
        };



        function refreshMensajes() {
            Chat.darMensajes($scope.amigo.id).then(function(mensajes) {

                autoscroll($scope.mensajes);
                $scope.mensajes = mensajes;

            });
        }

        function autoscroll(animate){
          setTimeout(function(){
            var chatListElement = $("#chat");
            if(animate){
              chatListElement.animate({
                  scrollTop: chatListElement[0].scrollHeight
              }, 500);
            } else{
              chatListElement[0].scrollTop = chatListElement[0].scrollHeight;
            }

          }, 100);
        }
    }
})();
