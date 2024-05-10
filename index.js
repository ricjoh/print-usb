'use strict';


// https://node-usb.github.io/node-usb/
// https://github.com/node-usb/node-usb/tree/master
// https://www.digitalocean.com/community/tutorials/how-to-create-a-node-js-module
// https://www.w3schools.com/nodejs/nodejs_modules.asp


var express = require('express');
var app = express();
var Server = require('http').Server;
var server = new Server(app);
var usbUtils = require('./src/pusb')  ;

// server.listen(2345);

console.info('Server listening at http://localhost:2345/');
// console.log( usbUtils.getDevices() );
console.log( usbUtils.getZebras() );

// __dirname is used here along with package.json.pkg.assets
// see https://github.com/zeit/pkg#config and
// https://github.com/zeit/pkg#snapshot-filesystem
app.use('/', express.static(__dirname + '/views'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
