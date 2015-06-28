(function () {
    'use strict';
    describe('app.chart.services', function () {
        var
            availPorts;

        beforeEach(module('app.chart.services', function ($provide) {
            availPorts = [];

        }));

        describe('socket tests', function () {
            var sampleObj;

            beforeEach(inject(function (socket) {
                sampleObj = socket;
            }));

            describe('isAuthenticated()', function () {

                it('should exist', inject(
                        function () {

                            assert.isDefined(sampleObj);
                            assert.isDefined(sampleObj.isAuthenticated);
                        })
                );

                it('should return false when not authenticated', inject(function () {
                    //Arrange
                    var mockResult,
                        actResult
                        ;

                    //Act
                    actResult = sampleObj.isAuthenticated();

                    //Assert

                    assert.isFalse(actResult,'initial state to be false');

                }));

            });

            describe('setAuthenticated()', function () {

                it('should exist', inject(
                        function () {

                            assert.isDefined(sampleObj);
                            assert.isDefined(sampleObj.setAuthenticated);
                        })
                );

                it('should set isAuthenticated to true when called', inject(function () {
                    //Arrange
                    var mockResult = true,
                        actResult
                        ;

                    //Act
                    sampleObj.setAuthenticated(mockResult);
                    actResult = sampleObj.isAuthenticated();
                    //Assert

                    assert.isTrue(actResult,'set to true');

                }));

            });

        });


    });


}());