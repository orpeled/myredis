'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('myRedisApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should have no commands to start', function () {
    expect(scope.commands.length).toBe(0);
  });

  it('should add commands on the log', function () {
    scope.command = 'Test 1';
    scope.addCommand();
    expect(scope.commands.length).toBe(1);
  });

  it('should add two then clear the log', function () {
    scope.command = 'Test 1';
    scope.addCommand();
    scope.command = 'Test 2';
    scope.addCommand();
    scope.removeCommand();
    expect(scope.commands.length).toBe(0);
  });

});