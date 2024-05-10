// Import any required modules here
let usb = require( 'usb' );

// Define the usb_utils object
const usb_utils = {
	getDevices: function() {
		// Code to connect to the USB device
		let devices = usb.getDeviceList();
		return devices;
	},
	getZebras: function() {
		let devices = usb.getDeviceList();
		return devices.find(item => item.deviceDescriptor.idVendor == 2655 ) || 'No Zebra devices found';
	}
};

// Export the usb_utils object
module.exports = usb_utils;
// 05E0 '0x05E0' 1504
// OA5F  2655
