'use strict';

/**
 * @ngdoc service
 * @name clienteApp.Image
 * @description
 * # Image
 * Service in the clienteApp.
 */
angular.module('clienteApp')
  .service('Image',
  [ '$http', '$q',
    function ($http, $q) {

      var Image = {};

      Image.get = function() {
        var request = {
          url: 'https://s3.us-east-2.amazonaws.com/wedding-image-bucket/',
          method: 'GET'
        }

        $http(request,
          function(response) {
            console.log(response);
          },
          function(error) {
            console.log('error: ', error);
          })
      }

      return Image;

    }
  ]);
