//Weather http://api.openweathermap.org/data/2.5/weather?lat=4.672441016945879&lon=-74.06758514771603&appid=d08cf89aae234e20bc4cdd80a42d8543
(function() {
    var map, poly;
    var markerImage = new google.maps.MarkerImage('/img/marker.svg',
        new google.maps.Size(30, 30),
        new google.maps.Point(0, 0),
        new google.maps.Point(15, 15));
    var markerInitImage = new google.maps.MarkerImage('/img/marker-init.svg',
        new google.maps.Size(30, 30),
        new google.maps.Point(0, 0),
        new google.maps.Point(15, 15));

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();

    angular.module('app').directive('dirMapaIndiv', function() {
        return {
            restrict: 'E',
            scope: {
                ruta: '=',
                show: "="
            },
            templateUrl: 'app/mapa/dir-mapa.html',
            controller: controller
        };
    });


    function controller($scope, $timeout, $interval) {
        if (!$scope.ruta) {
            $scope.ruta = [];
        }
        /*setInterval(function(){
          console.log("$scope.ruta", $scope.ruta);
        }, 4000)*/
        $scope.$watch('ruta', function(ruta) {
            console.log("Nueva ruta", ruta);
        });
        $scope.$watch('show', function(show) {
            if (show) {
                setTimeout(function() {
                    initMap();
                }, 100);
                console.log("DIR MAPA");
            }

        });


        function initMap() {
            var mapElement = document.getElementById('map');
            console.log("Elemento del mapa ", mapElement);
            map = new google.maps.Map(mapElement, {
                center: {
                    lat: 4.60258436,
                    lng: -74.064453619
                },
                zoom: 14
            });
            var infoWindow = new google.maps.InfoWindow({
                map: map
            });

            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);

            poly = new google.maps.Polyline({
                strokeColor: '#192047',
                strokeOpacity: 0.5,
                strokeWeight: 5,
                map: map
            });

            // Add a listener for the click event
            google.maps.event.addListener(map, 'click', function(event) {
                clickOverMap(event.latLng);
            });

            // Try HTML5 geolocation.
            console.log("Try HTML5 geolocation");
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    console.log("Current location: lat:", position.coords.latitude, "lng:", position.coords.longitude);
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Usted esta aquí');
                    map.setCenter(pos);
                    console.log("Try HTML5 geolocation: OK");
                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }



        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        }


        /**
         * Handles click events on a map, and adds a new point to the Polyline.
         * Updates the encoding text area with the path's encoded values.
         */
        var markerIni;
        var markerEnd;

        function clickOverMap(latLng) {
            if (markerIni && markerEnd) {
                quitMarkers();
            }
            if (!markerIni) {
                markerIni = new google.maps.Marker({
                    position: latLng,
                    title: 'inicio',
                    map: map
                });
            } else {
                markerEnd = new google.maps.Marker({
                    position: latLng,
                    title: 'final',
                    map: map
                });

                calcRoute();
            }
        }

        function quitMarkers() {
            markerIni.setMap(null);
            markerEnd.setMap(null);
            markerIni = null;
            markerEnd = null;
        }



        function calcRoute() {
            var request = {
                origin: markerIni.getPosition(),
                destination: markerEnd.getPosition(),
                travelMode: 'DRIVING'
            };
            quitMarkers();
            directionsService.route(request, function(result, status) {
                if (status == 'OK') {
                    console.log("Result:", result)
                    $scope.rutaPlaneada = result.routes[0].overview_path;
                    simular($scope.rutaPlaneada);
                    directionsDisplay.setDirections(result);
                } else {
                    console.log("Error", result, status);
                }
            });
        }

        function simular(ruta) {
            var i = 0;
            var markerActual = new google.maps.Marker({
                position: ruta[i],
                title: 'actual',
                map: map
            });

            var intervaloSimulacion = $interval(function() {
                console.log("SIMULACION");
                var newPosition = ruta[i++];
                console.log("SIMULACION:", newPosition);
                if (newPosition)
                    markerActual.setPosition(newPosition);
                else
                    $interval.cancel(intervaloSimulacion);
            }, 5000);
        }

        function updateRuta() {
            var path = poly.getPath();
            $scope.ruta.splice(0, $scope.ruta.length);
            console.log("Path", path);
            path.forEach(function(latLng) {
                $scope.ruta.push({
                    lat: latLng.lat(),
                    lng: latLng.lng()
                });
            });

        }


    }


})();
