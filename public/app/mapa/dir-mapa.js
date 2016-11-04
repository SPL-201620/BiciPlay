//Weather http://api.openweathermap.org/data/2.5/weather?lat=4.672441016945879&lon=-74.06758514771603&appid=d08cf89aae234e20bc4cdd80a42d8543
(function() {
    var map, poly, infoWindow;
    var markerImage = new google.maps.MarkerImage('/img/marker.svg',
        new google.maps.Size(30, 30),
        new google.maps.Point(0, 0),
        new google.maps.Point(15, 15));
    var markerInitImage = new google.maps.MarkerImage('/img/marker-init.svg',
        new google.maps.Size(30, 30),
        new google.maps.Point(0, 0),
        new google.maps.Point(15, 15));
    angular.module('app').directive('dirMapa', function() {
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


    function controller($scope, $timeout) {
        if (!$scope.ruta) {
            $scope.ruta = [];
        }

        function refreshRuta() {
            console.log("Nueva ruta", $scope.ruta);
            markers.forEach(function(marker) {
                marker.setMap(null);
            });
            markers = [];
            $scope.ruta.forEach(function(ubicacion) {
                addLatLngToPoly(new google.maps.LatLng(ubicacion.lat, ubicacion.lng));
            });
        }
        $scope.$watch('show', function(show) {
            if (show) {
                setTimeout(function() {
                    var initialPos;
                    if ($scope.ruta && $scope.ruta.length > 0) {
                        initialPos = {
                            lat: $scope.ruta[0].lat,
                            lng: $scope.ruta[0].lng
                        };
                    }
                    initMap(initialPos);
                    refreshRuta();
                }, 100);
            }

        });

        function initMap(initialPos) {
            var mapElement = document.getElementById('map');
            map = new google.maps.Map(mapElement, {
                center: {
                    lat: 4.60258436,
                    lng: -74.064453619
                },
                zoom: 14
            });
            infoWindow = new google.maps.InfoWindow({
                map: map
            });

            poly = new google.maps.Polyline({
                strokeColor: '#192047',
                strokeOpacity: 0.5,
                strokeWeight: 5,
                map: map
            });

            // Add a listener for the click event
            google.maps.event.addListener(map, 'click', function(event) {
                addLatLngToPoly(event.latLng, poly);
                updateRuta();
            });

            if(initialPos){
                map.setCenter(initialPos);
            } else{
                centerMapOnCurrentLocation();
            }
        }
        function centerMapOnCurrentLocation(){
            // Try HTML5 geolocation.
            console.log("Try HTML5 geolocation");
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    console.log("Current location: lat:", position.coords.latitude, "lng:", position.coords.longitude);
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    map.setCenter(pos);
                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Usted esta aquí');

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
        var markers = [];

        function addLatLngToPoly(latLng) {
            var path = poly.getPath();
            path.push(latLng);
            var currentMarkerImage = (path.getLength() === 1) ? markerInitImage : markerImage;

            var marker = new google.maps.Marker({
                position: latLng,
                title: '#' + path.getLength(),
                draggable: true,
                icon: currentMarkerImage,
                map: map
            });
            markers.push(marker);
            marker.addListener('drag', onMarkerMove);

        }

        function onMarkerMove(event) {
            var path = [];

            for (var i = 0; i < markers.length; i++) {
                path.push(markers[i].getPosition());
            }
            poly.setPath(path);
            updateRuta();
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
