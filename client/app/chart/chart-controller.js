angular.module('app')
    .controller('ChartCtrl', ['$scope','socket', function ($scope,socket) {
        // here we define the items to be repeated in the template


        $scope.stocks = [];
        socket.on('msg', function (data) { // Listening in Socket in Angular Controller
            $scope.stocks = JSON.parse(data.msg);

        });

    }]);
