'use strict';

var doctorFinderApp = angular.module('doctorFinderApp', []);

doctorFinderApp.controller('doctorFinderController', ['$scope', '$http', function ($scope, $http) {

    var map;

    function initialize() {
        var mapOptions = {
            center: {lat: 29.5, lng: -98.5},
            zoom: 10
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    $http.get('/angular-test/search.json').success(function (data) {
        $scope.professionals = data.professionals;
        angular.forEach(data.professionals, function (professional) {
            professional.locations.forEach(function (location) {
                var lat = location.address.latitude;
                var lng = location.address.longitude;
                var latLng = new google.maps.LatLng(lat, lng);
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: professional.name
                });
            });
        })
    });

    $scope.focusMap = function (location) {
        var latLong = new google.maps.LatLng(location.address.latitude, location.address.longitude);
        map.panTo(latLong);
        map.setZoom(15);
    };

}]);
