'use strict';

/**
 * @ngdoc service
 * @name travelPlannerApp.Planner
 * @description
 * # Planner
 * Factory in the travelPlannerApp.
 */
angular.module('travelPlannerApp')
  .factory('Planner', function ($http) {
    var Travel = {
    nearby: function (latitude, longitude) {
      var url = 'https://api.resrobot.se/v2/location.nearbystops?originCoordLat=' + latitude + '&key=ebed42ee-979c-45e8-a5aa-e3035632b46a&format=json&lang=en&originCoordLong=' + longitude;
      return $http.get(url)
      .then(function (res) {
        return res.data.StopLocation;
      });
    },
    search: function (locationOne, locationTwo) {
      // searching of between trips...
    },
    locationNameLookUp: function (name) {
      var url = 'https://api.resrobot.se/v2/location.name?input=' + name + '&key=ebed42ee-979c-45e8-a5aa-e3035632b46a&format=json';
      return $http.get(url)
      .then(function (res) {
        return res.data.StopLocation;
      });
    },
    trip: function (start, destination, time, date) {
      if (time === undefined && date === undefined) {
        var url = 'https://api.resrobot.se/v2/trip?&key=ebed42ee-979c-45e8-a5aa-e3035632b46a&format=json&originId=' + start + '&lang=en&destId=' + destination;
        return $http.get(url)
        .then(function (res) {
          return res.data.Trip;
        }).catch(function (err) {
          return err;
        });
      } else {
        var url = 'https://api.resrobot.se/v2/trip?&key=ebed42ee-979c-45e8-a5aa-e3035632b46a&format=json&originId=' + start + '&lang=en&destId=' + destination + '&date=' + date + '&time=' + time;
        return $http.get(url)
        .then(function (res) {
          return res.data.Trip;
        }).catch(function (err) {
          return err;
        });
      }
    },
  };

  return Travel;
  });
