'use strict';

var NetworkZebra = require('./src/network_zebra');
var bodyParser = require('body-parser');
var express = require('express');
var app = express().enable('trust proxy');
var Server = require('http').Server;
var server = new Server(app);
// app.use( bodyParser.urlencoded( { extended: false } ) );

app.use(bodyParser.json());
app.use(function (error, req, res, next) {
	if (error instanceof SyntaxError) {
		console.error('Invalid JSON payload.');
		res.status(400).send( 'Payload must be JSON.' );
	} else {
		next();
	}
});

let DEBUG = false;

// process argv
const getArgs = () =>
	process.argv.reduce((args, arg) => {
		// long arg
		if (arg.slice(0, 2) === "--") {
			const longArg = arg.split("=");
			const longArgFlag = longArg[0].slice(2);
			const longArgValue = longArg.length > 1 ? longArg[1] : true;
			args[longArgFlag] = longArgValue;
		}
		// flags
		else if (arg[0] === "-") {
			const flags = arg.slice(1).split("");
			flags.forEach((flag) => {
				args[flag] = true;
			});
		}
		return args;
	}, {});

const args = getArgs();
if ( args['help'] || args['h']) {
	console.log("Usage: node index.js --serverport=2345 --printer='192.168.1.1:9100'\n\nOptions:\n" +
	"\t--serverport=2345\t\tWebserver Port (optional, defaults to 2345)\n" +
	"\t--printer_config='ip-addr:port'\tPrinter IP and Port (optional, defaults to 9100)\n" +
	"\t--verbose | -v\t\t\tVerbose output\n");
	process.exit();
}

if ( args['v'] || args['verbose'] ) {
	console.log(args);
	DEBUG = true;
	console.log( app.disabled('trust proxy') ? 'trust proxy disabled' : 'trust proxy enabled' );
}

// add this handler before emitting any events
process.on( 'uncaughtException', function( err ) {
	let now = new Date();
	console.log( "\nHANDLING UNEXPECTED EXCEPTION; KEEPING PROCESS ALIVE @ " + now +  ": " );
	console.log( "\t", err.message );
	console.log( "\t", err.stack ); // turn on to debug
} );

var getIP = function( req ) {
	var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
	const parts = ip.split(':');
	return parts[parts.length - 1];
}

//                  8
//                  8
// o   o   o .oPYo. 8oPYo.   .oPYo. .oPYo. oPYo. o    o .oPYo. oPYo.
// Y. .P. .P 8oooo8 8    8   Yb..   8oooo8 8  `' Y.  .P 8oooo8 8  `'
// `b.d'b.d' 8.     8    8     'Yb. 8.     8     `b..d' 8.     8
//  `Y' `Y'  `Yooo' `YooP'   `YooP' `Yooo' 8      `YP'  `Yooo' 8
// ::..::..:::.....::.....::::.....::.....:..::::::...:::.....:..::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const sp = args['serverport'] || 2345;
server.listen(sp);
console.log('Server listening at http://localhost:' + sp + '/');

let printer_config = args['printer']?.split(':') || ['10.10.3.127', 9100];

let PRINTER = new NetworkZebra(printer_config[0], printer_config[1], DEBUG);
PRINTER.status();

app.use('/', express.static(__dirname + '/views'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.post('/print', function (req, res) {
	if ( DEBUG ) {
		console.log( '\nPrint Request from ' + getIP( req ) + ':' );
		console.log(req.body);
	}
	PRINTER.print(req.body.label);
	res.end('');
});

app.get('/status', function (req, res) {
	if ( DEBUG ) {
		console.log( '\nStatus Request from ' + getIP( req ) + ':' );
	}
	PRINTER.status();
	let response = setInterval(function () {
		if (PRINTER.lastStatus) {
			clearInterval(response);
			res.end('<pre>' + PRINTER.lastStatus + '</pre>');
			if ( DEBUG ) {
				console.log( '\nStatus:' );
				console.log( PRINTER.lastStatus );
			}
		}
	}, 50);
});

