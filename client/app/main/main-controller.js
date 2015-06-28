'use strict';

angular.module('app.main.controllers', []);

angular.module('app.main.controllers')
    .controller('MainCtrl', ['$scope', function ($scope) {
        // here we define the items to be repeated in the template
        $scope.list1 = [
            {label: 'one'},
            {label: 'two'},
            {label: 'three'}
        ];

        $scope.list2 = [
            {label: 'uno'},
            {label: 'dos'},
            {label: 'tres'}
        ];


    }]);
