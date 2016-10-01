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
    angular.module('app').directive('dirMapa', function() {
        return {
            restrict: 'E',
            scope: {
                ruta: '@'
            },
            templateUrl: 'app/mapa/dir-mapa.html',
            controller: controller
        };
    });


    function controller($scope, $timeout) {
        if (!$scope.ruta) {
            $scope.ruta = [];
        }
        $scope.$watch('ruta', function(ruta) {

        })
        initMap();
        console.log("DIR MAPA")

    }

    function initMap() {
        var mapElement = document.getElementById('map');
        console.log("Elemento del mapa ", mapElement);
        map = new google.maps.Map(mapElement, {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 14
        });
        var infoWindow = new google.maps.InfoWindow({
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
        });

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Usted esta aquí');
                map.setCenter(pos);
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
        var currentMarkerImage = (path.getLength() === 1)? markerInitImage:markerImage;

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

    }
})();
