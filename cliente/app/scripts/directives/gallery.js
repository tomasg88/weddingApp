'use strict';

/**
 * @ngdoc directive
 * @name clienteApp.directive:gallery
 * @description
 * # gallery
 */
angular.module('clienteApp')
  .directive('gallery', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the gallery directive');
      }
    };
  });
