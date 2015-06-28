'use strict';

angular.module('app.chart.controllers', []);

angular.module('app.chart.controllers')
    .controller('ChartCtrl', ['$scope', 'socket', function ($scope, socket) {
        // here we define the items to be repeated in the template

        var items = [], item;

        $scope.isAuthenticated = false;


        socket.on('message', function (data) {
            // Listening in Socket in Angular Controller


            item = JSON.parse(data);
            if (item.value && item.timestamp) {

                $scope.isAuthenticated = true;

                items.push(item);

                //Trim the length of the items in the chart
                if (items.length > 30) {
                    items.shift();
                }

                $scope.chart = {
                    data: items,
                    max: 30
                };
            }

        });

    }]);
