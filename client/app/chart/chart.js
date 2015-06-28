'use strict';

angular.module('app.chart', [
    'app.chart.services',
    'app.chart.controllers',
    'app.chart.directives'
]);

angular.module('app.chart')
    .config(['$stateProvider', function ($stateProvider) {
        'use strict';

        $stateProvider.state('chart', {
            url: '/chart',
            templateUrl: 'app/chart/chart.html',
            controller: 'ChartCtrl'
        });
    }])
;
