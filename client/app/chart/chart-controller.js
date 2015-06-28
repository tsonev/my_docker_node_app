'use strict';

angular.module('app.chart.controllers', []);

angular.module('app.chart.controllers')
    .controller('ChartCtrl', ['$scope', 'socket', function ($scope, socket) {
        // here we define the items to be repeated in the template

        $scope.isAuthenticated = socket.isAuthenticated;

    }]);
