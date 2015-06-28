'use strict';

angular.module('app.chart.services', []);

angular.module('app.chart.services')
    .factory('socket',['$rootScope', function ($rootScope) {
        var socket = io.connect(); // Connection to the server socket
        var isAuthenticated = false;
        return {
            on: function (eventName, callback) { // Return callback to the actual function to manipulate it.

                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            sendToken : function(token) {
                console.log(token);
                socket.send({'token': token});
            },
            getSecret : function() {
                socket.send({'secret': 'get'});
            },
            isAuthenticated : function() {
                return isAuthenticated;
            },
            setAuthenticated : function(mode) {
                isAuthenticated = mode;
            }
        };
    }])
;
