'use strict';

angular.module('app.main', [
    'app.main.controllers'
]);

angular.module('app.main')
    .config(['$stateProvider', function ($stateProvider) {
        'use strict';

        $stateProvider.state('main', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'
        });
    }]);
;
