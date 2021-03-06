'use strict';

angular.module('app.chart.directives', []);

angular.module('app.chart.directives')
    .directive('otpWidget',[function(){
        return {
            restrict: 'E',
            replace: true,
            scope: {

            },
            templateUrl: 'components/otp/otpWidget.html',
            controllerAs: 'otp',
            bindToController: true,
            controller: [ 'socket', function(socket) {
                var otp = this;

                //Get key form backend via open socket
                socket.getSecret();

                otp.submitToken = function(){
                    socket.sendToken(otp.token);
                };

                socket.on('message',function(data){
                    //if user is not authenticated socket should broadcast secret.key
                    var secret = JSON.parse(data);
                    if(secret.key) {
                        otp.secret = secret.key;
                    }
                    if (secret.chart) {
                        socket.setAuthenticated(true);
                    }
                    if(secret.error){
                        otp.error = secret.error;
                    }
                });

                return otp;
            }],
            link: function(scope, element, attrs, ctrl) {

            }
        };
    }])
    .directive('lineChart', function () {
        return {
            template: '<div></div>',
            scope: {
                'type' : '@',
                'chartType' : '@'
            },
            restrict: 'E',
            replace: true,
            controllerAs: 'cc',
            bindToController: true,
            controller: [ 'socket', function(socket) {
                var cc = this;
                var items = [], item;

                socket.on('message', function (data) {
                    // Listening in Socket in Angular Controller


                    item = JSON.parse(data);
                    if (item.chart[cc.type]) {

                        items.push(item.chart[cc.type]);

                        //Trim the length of the items in the chart
                        if (items.length > 5*60) {
                            items.shift();
                        }

                        cc.chart = {
                            data: items,
                            max: 5*60
                        };
                    }

                });

                return cc;
            }],
            link: function postLink(scope, element, attrs, ctrl) {
                var lineChart = new google.visualization[ctrl.chartType](element[0]);

                function draw(chart) {
                    var data = chart.data,absMax;

                    var table = new google.visualization.DataTable();
                    table.addColumn('datetime');
                    table.addColumn('number',ctrl.type+':'+data[data.length-1].value);
                    table.addRows(data.length);

                    var view = new google.visualization.DataView(table);

                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        table.setCell(i, 0, new Date(item.timestamp));
                        absMax = item.absMax;
                        var value = parseFloat(item.value);
                        table.setCell(i, 1, value);
                    }

                    var last = data[data.length - 1];
                    var max = new Date(last.timestamp);
                    var min = new Date(last.timestamp - chart.max * 1000);

                    var chartOptions = {
                        legend:{position: 'top', maxLines: 3},
                        vAxis: { minValue: 0, maxValue: absMax },
                        hAxis: { viewWindow: { min: min, max: max }}
                    };

                    lineChart.draw(view, chartOptions);
                }

                scope.$watch('cc.chart', function (chart) {
                    if (chart && chart.data && chart.max) {
                        draw(chart);
                    }
                });
            }
        };
    })
;
