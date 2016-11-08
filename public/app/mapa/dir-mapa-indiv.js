//Weather http://api.openweathermap.org/data/2.5/weather?lat=4.672441016945879&lon=-74.06758514771603&appid=d08cf89aae234e20bc4cdd80a42d8543
(function() {

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
    var distanceService = new google.maps.DistanceMatrixService();
    var distanciTotal;

    angular.module('app').directive('dirMapaIndiv', function() {
        return {
            restrict: 'E',
            scope: {
                rutaPlaneadaObligatoria: '=?',
                ruta: '=',
                duracion: '=',
                weather: "=",
                weatherIcon: "=",
                show: "=",
                distancia: "="
            },
            templateUrl: 'app/mapa/dir-mapa.html',
            controller: controller
        };
    });


    function controller($scope, $timeout, $interval) {
        var map, poly;
        if (!$scope.ruta) {
            $scope.ruta = [];
        }

        $scope.$watch('rutaPlaneadaObligatoria', function(){
            console.log("Ruta planeada:", $scope.rutaPlaneadaObligatoria);
            setTimeout(function() {
                if($scope.rutaPlaneadaObligatoria){
                    var startPoint = $scope.rutaPlaneadaObligatoria[$scope.rutaPlaneadaObligatoria.length-1];
                    var endPoint = $scope.rutaPlaneadaObligatoria[0];
                    if(startPoint.id > endPoint.id){
                        var temp = startPoint;
                        startPoint = endPoint;
                        endPoint = temp;
                    }
                    clickOverMap(new google.maps.LatLng(startPoint.lat, startPoint.lng));
                    clickOverMap(new google.maps.LatLng(endPoint.lat, endPoint.lng));
                }
            }, 200);

        });

        /*setInterval(function(){
          console.log("$scope.ruta", $scope.ruta);
        }, 4000)*/
        $scope.$watch('ruta', function(ruta) {
            console.log("Nueva ruta", ruta);
            if(ruta){
                $interval.cancel(intervaloSimulacion);
                quitMarkers();

                if (poly)
                    poly.setMap(null);
                if (directionsDisplay)
                    directionsDisplay.setMap(null);
                poly = new google.maps.Polyline({
                    strokeColor: '#006600',
                    strokeOpacity: 0.8,
                    strokeWeight: 5,
                    map: map
                });
                var path = poly.getPath();
                ruta.forEach(function(ubicacion) {
                    path.push(new google.maps.LatLng(ubicacion.lat, ubicacion.lng));
                });
                if (ruta.length > 0){
                    map.setCenter({lat: ruta[0].lat,lng: ruta[0].lng});
                }
            }

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
            if (markerIni) {
                markerIni.setMap(null);
                markerIni = null;
            }
            if (markerEnd) {
                markerEnd.setMap(null);
                markerEnd = null;
            }


        }



        function calcRoute() {
            var origin = markerIni.getPosition();
            var destination = markerEnd.getPosition();
            var request = {
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING'
            };
            quitMarkers();
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
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

            distanceService.getDistanceMatrix({
                origins: [origin],
                destinations: [destination],
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.METRIC
            }, function(response, status) {
                if (status == 'OK') {

                    console.log("Result distance:", response);
                    var results = response.rows[0].elements;
                    var result = results[0];
                    distanciTotal = result.distance.value;
                    $scope.distance = result.distance.text;
                    $scope.tiempo = result.duration.text;
                } else {
                    console.log("Error", response, status);
                }
            });


            var queryTxt = "http://api.openweathermap.org/data/2.5/weather?lat=" + origin.lat() + "&lon=" + origin.lng() + "&appid=d08cf89aae234e20bc4cdd80a42d8543";
            $.getJSON(queryTxt).then(function(rsp) {
                var prefix = "wi wi-";
                var dorn = "";

                var today = new Date();
                var hour = today.getHours();

                if (hour > 6 && hour < 20) {
                    //Day time
                    dorn = "day-";

                } else {
                    //Night time
                    dorn = "night-";
                }
                console.log(dorn);
                var weather = rsp.weather[0];
                var code = weather.id;
                console.log("Weather:", weather);
                $scope.iconClass = prefix + "owm-" + dorn + code;
                $scope.weather = weather.description;
                console.log("Icon class: ", $scope.iconClass);
                $scope.weatherIcon = $scope.iconClass;
            });
        }

        var intervaloSimulacion;

        function simular(ruta) {
            if (intervaloSimulacion)
                $interval.cancel(intervaloSimulacion);
            if (poly)
                poly.setMap(null);
            poly = new google.maps.Polyline({
                strokeColor: '#006600',
                strokeOpacity: 0.8,
                strokeWeight: 5,
                map: map
            });
            $scope.ruta.splice(0, $scope.ruta.length);
            $scope.duracion = 0;
            var i = 0;
            var markerActual = new google.maps.Marker({
                position: ruta[i],
                title: 'actual',
                map: map
            });

            intervaloSimulacion = $interval(function() {
                var newPosition = ruta[i++];
                if (!newPosition)
                    return $interval.cancel(intervaloSimulacion);
                $scope.distancia = Math.round((i * distanciTotal) / (ruta.length * 100)) / 10;
                markerActual.setPosition(newPosition);
                var path = poly.getPath();
                path.push(newPosition);
                updateRuta();
                $scope.duracion += Math.floor(Math.random() * 2) + 0;
            }, 50);
        }

        function updateRuta() {
            var path = poly.getPath();
            $scope.ruta.splice(0, $scope.ruta.length);
            path.forEach(function(latLng) {
                $scope.ruta.push({
                    lat: latLng.lat(),
                    lng: latLng.lng()
                });
            });

        }


    }


})();
