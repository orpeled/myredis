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
    var MAX_LOG_SIZE = 5;
    // Todos
    var todosInStore = localStorageService.get('todos');

    $scope.todos = todosInStore || {};

    $scope.$watch('todos', function () {
        localStorageService.set('todos', $scope.todos);
    }, true);

    // Log
    var logsInStore = localStorageService.get('logs');

    $scope.logs = logsInStore || [];

    $scope.$watch('logs', function () {
        localStorageService.set('logs', $scope.logs);
    }, true);

    $scope.addTodo = function () {
        addLog($scope.todo);
        var commandToExecute = $scope.todo.split(' ');
        console.log(commandToExecute);
        if (commandToExecute.length < 2 || commandToExecute.length > 3 ) {
            $scope.todo = '';
            return;
        }
            switch(commandToExecute[0]) {
                    
                case 'SET':                    
                    setCommand(commandToExecute);     
                    break;
                    
                case 'GET':
                    getCommand(commandToExecute); 
                    break;
                    
                case 'DEL':
                    delCommand(commandToExecute);
                    break;
                    
                case 'EXPIRE':
                    if (commandToExecute.length === 3) {
                            
                    }
                    break;   
                    
                case 'EXISTS':
                    existsCommand(commandToExecute);
                    break;
                    
                case 'KEYS':
                    if (commandToExecute.length === 3) {
                    }
                    break;
                    
                default:
                    $scope.todo = '';
            }    
    };
    
    function getCommand(inputArray) {
        // ADD PRINT TO CLI + ADD "" 
        if (inputArray[1] in $scope.todos && inputArray.length === 2) {
            console.log($scope.todos[inputArray[1]]);
            $scope.todo = '';
        }
    }    
    function setCommand(inputArray) {
        if (!(inputArray[1] in $scope.todos) && inputArray.length === 3) {
            $scope.todos[inputArray[1]] = inputArray[2].replace(/"/g,'');
            console.log($scope.todos[inputArray[1]]);
            $scope.todo = '';
        }
        
    }
    // Supporting just one key at a time
    function delCommand(inputArray) {
        if (inputArray[1] in $scope.todos && inputArray.length === 2) {
            delete $scope.todos[inputArray[1]];
            $scope.todo = '';
        }
    
    }
    
    function existsCommand(inputArray) {
        if (inputArray[1] in $scope.todos && inputArray.length === 2) {
            $scope.todo = '';
            console.log('> (integer) 1');
        } else {
            console.log('> (integer) 2');
        }
        maintainLogSize();
    
    }
    // Add to the log even if the command didn't go through.
    function addLog(logString) {
        if (logString.length === 0) {
            $scope.logs.push('>');
        }
        maintainLogSize();
        $scope.logs.push('> ' + logString);      
    }
    
    function maintainLogSize() {
        // Maintain max lines in log
        if ($scope.logs.length > MAX_LOG_SIZE) {
            $scope.logs.shift();
        }
    }

    
    // Clear method
    $scope.removeTodo = function () {
        if ($scope.todos.length !== 0) {
        $scope.todos = {};
        $scope.logs = [];
        }
    };
    
    
  });