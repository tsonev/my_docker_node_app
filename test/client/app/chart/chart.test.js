describe('chart', function () {
    'use strict';

    var $rootScope, $state;

    beforeEach(module('app'));
    beforeEach(module('app.chart'));
    beforeEach(module('app/chart/chart.html'));

    beforeEach(inject(function (_$rootScope_, _$state_) {
        $rootScope = _$rootScope_;
        $state = _$state_;
    }));

    describe('chart tests', function () {
        it('should test routes', function () {
            $state.go('chart');
            $state.transition.then(function () {
                expect($state.current.name).to.equal('chart');
            });
            $rootScope.$digest();
        });
    });
});
