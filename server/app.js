'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config');

var totpObj = require('./config/totp');
var totp = new totpObj.TOTP();
var secret = "JBSWY3DPEHPK3PXP";

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


// use socket.io
var io = require('socket.io').listen(server);

//turn off debug
io.set('log level', 1);


var clients = {};
var clientCount = 0;
var interval;

var gaugeValue = 50;

function broadcast() {



    gaugeValue += Math.random() * 40 - 20;
    gaugeValue = gaugeValue < 0 ? 0 : gaugeValue > 100 ? 100 : gaugeValue;
    var time = Date.now();

    var message = JSON.stringify({ value: Math.floor(gaugeValue), timestamp: time });

    for (var key in clients) {
        if(clients.hasOwnProperty(key)) {
            if(!clients[key].otp_authenticated){
            //    clients[key].disconnect('unauthorized');
            }else {
                clients[key].write(message);
            }
        }
    }

    //setTimeout(broadcast, 1000);
}

function startBroadcast () {
    interval = setInterval(broadcast, 1000);
    //broadcast();
}

// define interactions with client
io.sockets.on('connection', function (socket) {
    clientCount++;
    if (clientCount === 1) {
        startBroadcast();
    }

    clients[socket.id] = socket;

    clients[socket.id].secret = totp.getBase32Key();

    socket.on('message', function(message) {

        if(message.token) {
            var otp = totp.getOTP(clients[socket.id].secret);
            console.log( message.token +'==='+ otp);
            if(message.token === otp) {
                clients[socket.id].otp_authenticated = true;
            }
        }

        if(message.secret === 'get'){
            var message = JSON.stringify({ key: clients[socket.id].secret});
            clients[socket.id].write(message);
        }

    });

    socket.on('close', function() {
        clientCount--;
        delete clients[socket.id];
        if (clientCount === 0) {
            clearInterval(interval);
        }
    });
});