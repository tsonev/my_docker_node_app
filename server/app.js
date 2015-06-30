'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config');

var helmet = require('helmet');

var totpObj = require('./config/totp');
var totp = new totpObj.TOTP();


// Setup server
var app = express();
var https = require('https');
var server;

//setup security
app.use(helmet());

// Express configuration
require('./config/express')(app);
// Route configuration
require('./routes')(app);

// Start server

//security settings

app.use(helmet.noCache());
app.use(helmet.frameguard());

app.use(helmet.xssFilter());
app.use(helmet.frameguard('sameorigin'));
var ninetyDaysInMilliseconds = 7776000000;
app.use(helmet.hsts({ maxAge: ninetyDaysInMilliseconds }));
app.disable('x-powered-by');
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());

//security settings


server = https.createServer(config,app).listen(config.port, function () {
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

    var message = JSON.stringify({value: Math.floor(gaugeValue), timestamp: time});

    for (var key in clients) {
        if (clients.hasOwnProperty(key)) {
            //send graph data only for authenticated clients
            if (clients[key].otp_authenticated) {
                clients[key].write(message);
            }
        }
    }

}

function startBroadcast() {
    //broadcast every second
    interval = setInterval(broadcast, 1000);

}

// define interactions with client
io.sockets.on('connection', function (socket) {
    clientCount++;
    if (clientCount === 1) {
        startBroadcast();
    }

    clients[socket.id] = socket;

    // when opening a socket every client gets a random base32 secret key
    // for the duration of the socket lifetime
    // in real systems :
    // 1. these would be a used in conjunction with Something You Know = username and passwords
    // 2. and OTP will be delivered to Something You Have - independent channel phone/hw token

    clients[socket.id].secret = totp.getBase32Key();

    socket.on('message', function (message) {

        //client sent auth token
        if (message.token) {
            var otp = totp.getOTP(clients[socket.id].secret);
            //veryfy token
            if (message.token === otp) {
                clients[socket.id].otp_authenticated = true;
            } else {
                var msg = JSON.stringify({error: 'Wrong verification token'});
                clients[socket.id].write(msg);
            }
        }

        //send the secret key to the client
        if (message.secret === 'get') {
            var msg = JSON.stringify({key: clients[socket.id].secret});
            clients[socket.id].write(msg);
        }

    });

    socket.on('close', function () {
        clientCount--;
        delete clients[socket.id];
        if (clientCount === 0) {
            clearInterval(interval);
        }
    });
});