(function () {
    "use strict";



    var cities = [
              {
                  city : 'The English Cake Company  ',
                  desc : 'Colombo !',
                  lat : 6.8929988,
                  long : 79.8661994

              }
          ];

angular.module('animateApp')
    .controller('mapCtrl', function($scope) {
           var mapOptions = {
                  zoom: 15,
                  center: new google.maps.LatLng(6.8929988, 79.8661994),
                  mapTypeId: google.maps.MapTypeId.ROADMAP

              }

              $scope.map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

              $scope.markers = [];
              
              var infoWindow = new google.maps.InfoWindow();
              
              var createMarker = function (info){
                  
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(info.lat, info.long),
                      title: info.city
                      //animation:google.maps.Animation.BOUNCE

                  });
                  marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
                  
                  google.maps.event.addListener(marker, 'click', function(){
                      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                      infoWindow.open($scope.map, marker);
                  });
                  
                  $scope.markers.push(marker);
                  
              }  
              
              for (var i = 0; i < cities.length; i++){
                  createMarker(cities[i]);
              }

              $scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
              }

        });
})();




