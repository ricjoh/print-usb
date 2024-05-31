const net = require('net');

class NetworkZebra {
    constructor(printerIP = '10.10.3.127', port = 9100, debug = false) {
		this.ip_addr = printerIP;
		this.port = port;
        this.printer = {};
        this.lastError = '';
        this.lastStatus = '';
		this._debug = debug;
		this.ready = false;
		console.log('Printer object created.\nConnection information: ' + this.ip_addr + ':' + this.port);
    }

	connect() {
		// Create a new TCP client
		const client = new net.Socket();

		client.on('connect', () => {
			this.printer = client;
			if ( this._debug ) console.log('TCP/IP: Connected to printer, calling callback...');
			this.ready = true;
		})
		.on('data', (data) => {
			if ( this._debug ) console.log( 'Status returned from printer.' );
			this.lastStatus += data.toString('ascii').replace(/[\002\003]/g, '') + '\n';
			// this.printer.destroy();
		})
		.on('error', (err) => {
			console.error('Error:', err.message);
			this.lastError = err.message;
			return false;
		})
		.on('close', () => {
			console.log('Connection closed');
			return;
		})

		.connect(this.port, this.ip_addr, () => {
			if ( this._debug ) console.log('CALLBACK: Connected to printer at ' + this.ip_addr + ':' + this.port);
		});

	}

	print(label) {
		this.connect();
		console.log('PRINT: Requested printer connection...');
		let interval = setInterval(() => {
			if (this.ready) {
				clearInterval(interval);
				if ( this._debug ) console.log('PRINT: Sending label to printer...');
				this.printer.write(label);
				this.printer.destroy();
			} else {
				console.log('PRINT: Waiting for printer to be ready...');
			}
		}, 50);
	}

	destroy() {
		this.printer.destroy();
		this.ready = false;
		if ( this._debug ) {
			console.log( 'Printer TCP/IP connection destroyed.' );
		}
	}

	status() {
		this.lastStatus = '';
		if ( this._debug ) console.log('STATUS: Requested printer connection...');
		this.connect();
		let tries =  50;
		let interval = setInterval(() => {
			if (this.ready) {
				clearInterval(interval);
				if ( this._debug ) console.log('STATUS: Asking printer for status...');
				// let status_request += '! U1 getvar "interface.network.active.ip_addr"' + "\n\x03"; // for ip address
				let status_request = "~HQPP\n~HI\n";
				this.printer.write(status_request);
			} else {
				if ( tries-- > 1 ) {
					console.log('STATUS: Waiting for printer to be ready... ' + tries + ' tries left.');
				} else {
					console.error('STATUS: Printer not ready after 50 tries.');
					clearInterval(interval);
				}
			}
		}, 100);

	}

}

module.exports = NetworkZebra;
