const net = require('net');

class NetworkZebra {
    constructor(printerIP = '10.10.3.127', port = 9100) {
		this.ip_addr = printerIP;
		this.port = port;
        this.printer = this.connect(printerIP, port);
        this.lastError = '';
        this.lastStatus = '';
    }

	connect(printerIP, port) {
		// Create a new TCP client
		const client = new net.Socket();

		client.connect(port, printerIP, () => {
			console.log('Connected to printer');
		});

		client.on('data', (data) => {
			// console.log( data.toString('ascii') );
			this.lastStatus = data.toString('ascii');
		});

		client.on('error', (err) => {
			console.error('Error:', err.message);
			this.lastError = err.message;
			return false;
		});

		client.on('close', () => {
			console.log('Connection closed');
			return;
		});

		return client;
	}

	print(label) {
		this.printer.write(label);
	}

	destroy() {
		this.printer.destroy();
	}

	status() {
		this.lastStatus = '';
		console.log( 'Status' );
		this.printer.write("UQ\n");
	}

}

module.exports = NetworkZebra;
