'use strict';

angular.module('app.about', []);

angular.module('app.about')
    .config(['$stateProvider', function ($stateProvider) {
        'use strict';

        $stateProvider.state('about', {
            url: '/about',
            templateUrl: 'app/about/about.html'
        });
    }]);
