'use strict';

/**
 * @ngdoc function
 * @name myRedisApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myRedisApp
 */
angular.module('myRedisApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
