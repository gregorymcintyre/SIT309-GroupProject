const awsIot = require('aws-iot-device-sdk');

const parking1 = awsIot.device({
	certPath: './certificates/parking1/4c54dfc22e-certificate.pem.crt',
	keyPath: './certificates/parking1/4c54dfc22e-private.pem.key',
	caPath: './certificates/rootCA.crt',
	clientId: 'gutterrash_1',
	host: 'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking2 = awsIot.device({
	certPath: './certificates/parking2/a6b4294fb4-certificate.pem.crt',
	keyPath: './certificates/parking2/a6b4294fb4-private.pem.key',
	caPath: './certificates/rootCA.crt',
	clientId: 'gutterrash_1',
	host: 'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking3 = awsIot.device({
	certPath: './certificates/parking3/',
	keyPath: './certificates/parking3/',
	caPath: './certificates/rootCA.crt',
	clientId: 'gutterrash_1',
	host: 'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});



parking1.on('connect', function() {
	isConnected=true;
	console.log ('connected to parking1');
});