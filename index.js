'use strict';


// https://node-usb.github.io/node-usb/
// https://github.com/node-usb/node-usb/tree/master
// https://www.digitalocean.com/community/tutorials/how-to-create-a-node-js-module
// https://www.w3schools.com/nodejs/nodejs_modules.asp


var NetworkZebra = require('./src/network_zebra');
var bodyParser = require( 'body-parser' );
var express = require('express');
var app = express();
var Server = require('http').Server;
var server = new Server(app);
// var usbUtils = require('./src/pusb')  ;
// app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

console.info('Server listening at http://localhost:2345/');
// // console.log( usbUtils.getDevices() );
// console.log( usbUtils.getZebras() );


//                  8
//                  8
// o   o   o .oPYo. 8oPYo.   .oPYo. .oPYo. oPYo. o    o .oPYo. oPYo.
// Y. .P. .P 8oooo8 8    8   Yb..   8oooo8 8  `' Y.  .P 8oooo8 8  `'
// `b.d'b.d' 8.     8    8     'Yb. 8.     8     `b..d' 8.     8
//  `Y' `Y'  `Yooo' `YooP'   `YooP' `Yooo' 8      `YP'  `Yooo' 8
// ::..::..:::.....::.....::::.....::.....:..::::::...:::.....:..::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
server.listen(2345);

let PRINTER = new NetworkZebra();

var _respondJSON = function( res, key, arrayorhash, key2, arrayorhash2 ) {
	// Default params
	key = key || false;
	key2 = key2 || false;
	object = arrayorhash || []; // but we can pass in a hash too.
	object2 = arrayorhash2 || []; // but we can pass in a hash too.

	res.statusCode = 200;
	res.setHeader( 'Cache-control', 'no-cache' );
	res.setHeader( 'Pragma', 'no-cache' );
	res.setHeader( 'Content-Type', 'application/json; charset=utf-8' );
	res.setHeader( 'Access-Control-Allow-Origin', '*' );
	var response = {
		response: "success"
	};

	if ( key ) response[ key ] = object;
	if ( key2 ) response[ key2 ] = object2;
	res.end( JSON.stringify( response ) );
}

// __dirname is used here along with package.json.pkg.assets
// see https://github.com/zeit/pkg#config and
// https://github.com/zeit/pkg#snapshot-filesystem
app.use('/', express.static(__dirname + '/views'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/print', function (req, res) {
  console.log( req.body );
  PRINTER.print( req.body.label );
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/status', function (req, res) {
  PRINTER.status();
  let response = setInterval( function() {
    if ( PRINTER.lastStatus ) {
      clearInterval( response );
      res.end( '<pre>' + PRINTER.lastStatus + '</pre>' );
    }
  }, 50 );
});

