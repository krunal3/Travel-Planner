'use strict';

angular.module('travelPlannerApp')
  .controller('SearchCtrl', function ($scope, Planner, moment) {
    

    $scope.searchNow = function () {
      $scope.now = !$scope.now;
      $scope.tableOne.startTime = null;
    };


    $scope.start = function (start) {
      Planner.locationNameLookUp(start)
      .then(function (data) {        
        $scope.startData = data;
      });
    };

    $scope.destination = function (start) {
      Planner.locationNameLookUp(start)
      .then(function (data) {        
        $scope.destinationData = data;        
      });
    };

    $scope.addTolist = function (station, index) {
      if (index === 'start') {
        $scope.tableOne = station;
        $scope.startData = {};
      } else {
        $scope.tableTwo = station;
        $scope.destinationData = {};
      }
    };

    $scope.searchTimes = function (departure, destination) {     
      moment.locale('sv');
      var depart_date = moment(departure.startTime).format("YYYY-MM-DD");
      var depart_time = moment(departure.startTime).format("LT");      
      $scope.tripResults = true;
      
      if (depart_time === 'Invalid date' && depart_date === 'Invalid date') {
        Planner.trip(departure.id, destination.id)
      .then(function (res) {            
        $scope.trips = res;        
      }).catch(function (err) {
        // if fails
      });
      } else {
        Planner.trip(departure.id, destination.id, depart_time, depart_date)
      .then(function (res) {      
        $scope.trips = res;
        
      }).catch(function (err) {
        // if fails
      });
      }
    };

    mapboxgl.accessToken = 'pk.eyJ1IjoidGVua2FrbGV0IiwiYSI6ImNpa2xsZzhlOTAwN2t2cWxzdXpqcHpwa3EifQ.H3dNmbWFhofi9ia3AVPzFA';
        
    
    $scope.showOnMap = function (trip) {          
      var route = trip.LegList.Leg;
      var start = [route[0].Origin.lon, route[0].Origin.lat];
      
      var newMap = new mapboxgl.Map({
        container: 'mapbox',
        style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
        center: start, // starting position [lng, lat]
        zoom: 11, // starting zoom
      });


      // create DOM element for the marker
      var el = document.createElement('div');
      el.id = 'marker';

      // create the marker
      new mapboxgl.Marker(el)
        .setLngLat(start)
        // .setPopup(popup) // sets a popup on this marker
        .addTo(newMap);
      
        route.forEach(function (mark) {
          if (mark.type === 'WALK') {
            return false;
          } else {
            // console.log('mark ', mark);
            mark.Stops.Stop.forEach(function (stop) {              
              var stops = [stop.lon, stop.lat];
              // create DOM element for the marker
              var el = document.createElement('div');
              el.id = 'marker';
              // create the popup
              var popup = new mapboxgl.Popup({ offset: 25 }).setHTML('<h4>' + stop.name + '</h4><p>' + stop.arrTime + '</p>');
              // create the marker
              new mapboxgl.Marker(el)
                .setLngLat(stops)
                .setPopup(popup) // sets a popup on this marker
                .addTo(newMap);
              
            });
          } // end of else
      });      
    };
  });
