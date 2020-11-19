'use strict';

/**
 * @ngdoc overview
 * @name travelPlannerApp
 * @description
 * # travelPlannerApp
 *
 * Main module of the application.
 */
angular
  .module('travelPlannerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'autocomplete',
    'moment-picker',
    'angularMoment',
  ])
  .config(function ($routeProvider, $locationProvider, momentPickerProvider) {
    momentPickerProvider.options({
      today: true
    });
    $routeProvider
      // .when('/', {
      //   templateUrl: 'views/map.html',
      //   controller: 'MapCtrl',
      // })
      // .when('/search', {
      //   templateUrl: 'views/search.html',
      //   controller: 'SearchCtrl',
      // })
      .when('/', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function (amMoment) {
    amMoment.changeLocale('sv');
  });
