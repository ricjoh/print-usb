const net = require('net');

// Replace with your printer's IP address
const printerIP = '10.10.3.127';
const port = 9100;

// Create a new TCP client
const client = new net.Socket();

client.connect(port, printerIP, () => {
  console.log('Connected to printer');

  // Send the status polling command
let label = `
.

N
q812
Q1218
S6
X20,10,2,802,1188
A50,70,0,3,3,1,N,"Ferguson Agency"
A35,120,0,5,3,2,N,"$999.99"
A50,250,0,3,2,1,N,"Client Deliverable"
LO20,300,802,10
b250,350,Q,m2,s12,eQ,"1122 Boogie Woogie Ave"
b250,723,A,d9,e78,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
B190,1070,0,3,3,7,100,R,"998152-001"
P1
.

`;

// label = `^default
// `;

label = `UQ
`;

  client.write(label);
  // client.destroy();
});

client.on('data', (data) => {
  console.log('Printer Status:', data.toString('ascii'));

  // Interpret the status bits here

  // Close the connection
  client.destroy();
  return;
});

client.on('close', () => {
  console.log('Connection closed');
  return;
});

client.on('error', (err) => {
  console.error('Error:', err.message);
  return;
});
