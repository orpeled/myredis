'use strict';

/**
 * @ngdoc function
 * @name myRedisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myRedisApp
 */


angular.module('myRedisApp')
  .controller('MainCtrl', function ($scope, localStorageService) {
    var todosInStore = localStorageService.get('todos');

    $scope.todos = todosInStore || [];

    $scope.$watch('todos', function () {
        localStorageService.set('todos', $scope.todos);
    }, true);

    $scope.addTodo = function () {
        if ($scope.todo.length !== 0) {
        $scope.todos.push($scope.todo);
        $scope.todo = '';
        }    };
    $scope.removeTodo = function (index) {
        $scope.todos.splice(index, 1);
    };
  });