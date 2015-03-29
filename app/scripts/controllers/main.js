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
    var MAX_LOG_SIZE = 6;
    // Commands
    var commandsInStore = localStorageService.get('commands');

    $scope.commands = commandsInStore || {};

    $scope.$watch('commands', function () {
        localStorageService.set('commands', $scope.commands);
    }, true);

    // Log
    var logsInStore = localStorageService.get('logs');

    $scope.logs = logsInStore || [];

    $scope.$watch('logs', function () {
        localStorageService.set('logs', $scope.logs);
    }, true);

    $scope.addCommand = function () {
        addLog($scope.command);
        var commandToExecute = $scope.command.split(' ');
        // Max 5 keys
        if (commandToExecute.length < 1 || commandToExecute.length > 5 ) {
            $scope.command = '';
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
                    $scope.logs.push('Sorry, didn\'t get to this');
                    break;   
                    
                case 'EXISTS':
                    existsCommand(commandToExecute);
                    break;
                    
                case 'KEYS':
                    keysCommand(commandToExecute);
                    break;
                    
            }    
    };
    
    function setCommand(inputArray) {
        if (!(inputArray[1] in $scope.commands) && inputArray.length === 3) {
            $scope.commands[inputArray[1]] = inputArray[2].replace(/"/g,'');
            $scope.logs.push('OK');
            maintainLogSize();
            $scope.command = '';
        }
        
    }
    
    function getCommand(inputArray) {
        if (inputArray[1] in $scope.commands && inputArray.length === 2) {
            $scope.logs.push('"' + inputArray[1] + '"');
        }
        maintainLogSize();
        $scope.command = '';
    }    
    
    // Supporting just one key at a time
    function delCommand(inputArray) {
        if (inputArray.length < 2) {
            raiseError();
        }
        var index, lengthOfArray;
        for (index = 1, lengthOfArray = inputArray.length; index < lengthOfArray; index++) {
            if (inputArray[index] in $scope.commands) {
                delete $scope.commands[inputArray[1]];
                $scope.logs.push('(integer) 1');
            } else {
                $scope.logs.push('(integer) 2');
            }
            maintainLogSize();
        }
        $scope.command = '';
    }
    
    // Exists command
    function existsCommand(inputArray) {
        if (inputArray[1] in $scope.commands && inputArray.length === 2) {
            $scope.command = '';
            $scope.logs.push('(integer) 1');
        } else {
            $scope.logs.push('(integer) 0');
        }
        maintainLogSize();
        $scope.command = '';
    
    }
    
    // Keys command
    function keysCommand(inputArray) {
        if (inputArray.length < 2) {
            raiseError();
        }
        
        // Finding all relevant keys.
        var pattern = new RegExp(inputArray[1]);
        console.log(pattern);
        var resultArray = [];
        Object.keys($scope.commands).forEach(function (key) {
            if (pattern.test(key)) {
                resultArray.push(key);
            }
        });
        
        console.log(resultArray);
        //Writing to CLI
        if (resultArray.length < 1) {
            $scope.command = '';
            return;
        }
        var index, len;
        var numberOfKeyToDisplay = 1;
        for (index = 0, len = resultArray.length; index < len; index++) {
            $scope.logs.push(numberOfKeyToDisplay + ') "' + resultArray[index] + '"');
            numberOfKeyToDisplay++;
        }
        maintainLogSize();
        $scope.command = '';
    }
    // Add to the log even if the command didn't go through.
    function addLog(logString) {
        $scope.logs.push('> ' + logString);           
        maintainLogSize();
    }
    
    // Raise error like Redis does
    function raiseError() { 
        $scope.logs.push('Error: lame syntax.');           
        maintainLogSize();
        $scope.command = '';
    }
    
    // Maintain max lines in log
    function maintainLogSize() {
        if ($scope.logs.length > MAX_LOG_SIZE) {
            $scope.logs.shift();
        }
    }
    
    // Clear method
    $scope.removeCommand = function () {
        if ($scope.commands.length !== 0) {
        $scope.commands = {};
        $scope.logs = [];
        }
    };
    
    
  });