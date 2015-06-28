'use strict';

angular.module('app.chart.controllers', []);

angular.module('app.chart.controllers')
    .controller('ChartCtrl', ['$scope','socket', function ($scope,socket) {
        // here we define the items to be repeated in the template

        var items = [],item;

        socket.on('message', function (data) { // Listening in Socket in Angular Controller
            item = JSON.parse(data);
            items.push(item);

            if (items.length > 30) {
                items.shift();
            }

            $scope.chart = {
                data: items,
                max: 30
            };

        });

    }]);
