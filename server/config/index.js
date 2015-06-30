/*
 * Config
 */

'use strict';

var path = require('path')
    , fs = require('fs');

module.exports = {
    // Environment
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(path.join(__dirname, '../..')),

    // Server port
    port: 9000,

    // Specify the key file for the server
    key: fs.readFileSync('./server/config/ssl/server.key'),

    // Specify the certificate file
    cert: fs.readFileSync('./server/config/ssl/server.crt'),

    // Specify the Certificate Authority certificate
    ca: fs.readFileSync('./server/config/ssl/client.crt'),

    // This is where the magic happens in Node.  All previous
    // steps simply setup SSL (except the CA).  By requesting
    // the client provide a certificate, we are essentially
    // authenticating the user.
    requestCert: true,

    // If specified as "true", no unauthenticated traffic
    // will make it to the route specified.
    rejectUnauthorized: true,
    // This is the password used when generating the server's key
    // that was used to create the server's certificate.
    // And no, I do not use "password" as a password.
    passphrase: "pass:x"
};
