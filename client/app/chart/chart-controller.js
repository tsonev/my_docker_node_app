angular.module('app')
    .controller('ChartCtrl', ['$scope','socket', function ($scope,socket) {
        // here we define the items to be repeated in the template
        $scope.gaugeValue = 0;

        var items = [],item;

        socket.on('message', function (data) { // Listening in Socket in Angular Controller
            item = JSON.parse(data);
            items.push(item);
            //console.log(item);
            if (items.length > 30) {
                items.shift();
            }

            $scope.chart = {
                data: items,
                max: 30
            };

            $scope.gaugeValue = item.value;
            //$scope.$apply();

        });

    }]);
