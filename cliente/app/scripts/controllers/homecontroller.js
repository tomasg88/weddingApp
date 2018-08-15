'use strict';

/**
 * @ngdoc function
 * @name clienteApp.controller:HomecontrollerCtrl
 * @description
 * # HomecontrollerCtrl
 * Controller of the clienteApp
 */
angular.module('clienteApp').controller('HomeController',
['Image',
  function (Image) {

    function init() {
      Image.get();
    }

    init()
  }
]);
