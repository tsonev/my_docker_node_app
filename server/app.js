'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config');

// Setup server
var app = express();
var http = require('http');
var server;

// Express configuration
require('./config/express')(app);
// Route configuration
require('./routes')(app);

// Start server
server = http.createServer(app).listen(config.port, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;


var msgWrite = '';

// use socket.io
var io = require('socket.io').listen(server);

//turn off debug
io.set('log level', 1);

var serverjson = [
    {"Product": "REL", "BBP": "10", "BSP": "10.2", "LTP": "10.1"},
    {"Product": "BEL", "BBP": "20", "BSP": "20.4", "LTP": "20"},
    {"Product": "MTL", "BBP": "50", "BSP": "50.5", "LTP": "50.1"},
    {"Product": "BSL", "BBP": "100", "BSP": "101", "LTP": "100.2"}
];

// define interactions with client
io.sockets.on('connection', function (socket) {
    //send data to client
    setInterval(function () {

        for (var i = 0; i < serverjson.length; i++) {
            serverjson[i].BBP = Math.round((parseInt(serverjson[i].BBP) + Math.random()) * 100) / 100;
            serverjson[i].BSP = Math.round((parseInt(serverjson[i].BSP) + Math.random()) * 100) / 100;
            serverjson[i].LTP = Math.round((parseInt(serverjson[i].LTP) + Math.random()) * 100) / 100;
        }

        var serverjsonstr = JSON.stringify(serverjson);

        socket.emit('msg', {'msg': serverjsonstr});
        socket.emit('msgWrite', msgWrite);
    }, 1000);

    //recieve client data
    socket.on('client_data', function (data) {
        process.stdout.write(data.letter);
        msgWrite = msgWrite + data.letter;
    });
});