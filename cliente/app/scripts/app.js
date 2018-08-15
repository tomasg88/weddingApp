'use strict';

/**
 * @ngdoc overview
 * @name clienteApp
 * @description
 * # clienteApp
 *
 * Main module of the application.
 */
angular
  .module('clienteApp', [
    'ngRoute'
  ])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/showImages', {
          templateUrl: 'views/home.html',
          controller: 'HomeController'
        });
    }
  ]);
