describe('main', function () {
  'use strict';

  var $rootScope, $state, $scope;

  beforeEach(module('app'));
  beforeEach(module('app/main/main.html'));

  beforeEach(inject(function (_$rootScope_, _$state_, $controller) {
    $rootScope = _$rootScope_;
    $state = _$state_;
    $scope = $rootScope.$new();
    $controller('MainCtrl', {$scope: $scope});
    $scope.$digest();
  }));

  describe('main tests', function () {

  });
});
