const awsIot = require('aws-iot-device-sdk');
const fetch = require("node-fetch");


const parking1 = awsIot.device({
	certPath:	'./certificates/parking1/4c54dfc22e-certificate.pem.crt',
	keyPath:	'./certificates/parking1/4c54dfc22e-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'gutterrash_1',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking2 = awsIot.device({
	certPath:	'./certificates/parking2/a6b4294fb4-certificate.pem.crt',
	keyPath:	'./certificates/parking2/a6b4294fb4-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'gutterrash_1',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking3 = awsIot.device({
	certPath:	'./certificates/parking3/2554f696ef-certificate.pem.crt',
	keyPath:	'./certificates/parking3/2554f696ef-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'gutterrash_1',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking4 = awsIot.device({
	certPath:	'./certificates/parking4/21e85a4a82-certificate.pem.crt',
	keyPath:	'./certificates/parking4/21e85a4a82-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'gutterrash_1',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking5 = awsIot.device({
	certPath:	'./certificates/parking5/e1227c5cce-certificate.pem.crt',
	keyPath:	'./certificates/parking5/e1227c5cce-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'gutterrash_1',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking6 = awsIot.device({
	certPath:	'./certificates/parking6/a450ae3190-certificate.pem.crt',
	keyPath:	'./certificates/parking6/a450ae3190-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'gutterrash_1',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking7 = awsIot.device({
	certPath:	'./certificates/parking7/bbb6f3aded-certificate.pem.crt',
	keyPath:	'./certificates/parking7/bbb6f3aded-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'gutterrash_1',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking8 = awsIot.device({
	certPath:	'./certificates/parking8/02a7125063-certificate.pem.crt',
	keyPath:	'./certificates/parking8/02a7125063-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'gutterrash_1',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});
const parking9 = awsIot.device({
	certPath:	'./certificates/parking9/a7b98e4de2-certificate.pem.crt',
	keyPath:	'./certificates/parking9/a7b98e4de2-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'gutterrash_1',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});
const parking10 = awsIot.device({
	certPath:	'./certificates/parking10/975dc8e754-certificate.pem.crt',
	keyPath:	'./certificates/parking10/975dc8e754-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'gutterrash_1',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

console.log('Conected to: '); 

var connectCount = 0;	//to simplify connections in the future

parking1.on('connect', function() {
	isConnected=true;
	connectCount++;
	console.log ('parking1');
});

parking2.on('connect', function() {
	isConnected=true;
	connectCount++;
	console.log ('parking2');
});

parking3.on('connect', function() {
	isConnected=true;
	connectCount++;
	console.log ('parking3');
});

parking4.on('connect', function() {
	isConnected=true;
	connectCount++;
	console.log ('parking4');
});

parking5.on('connect', function() {
	isConnected=true;
	connectCount++;
	console.log ('parking5');
});

parking6.on('connect', function() {
	isConnected=true;
	connectCount++;
	console.log ('parking6');
});

parking7.on('connect', function() {
	isConnected=true;
	connectCount++;
	console.log ('parking7');
});

parking8.on('connect', function() {
	isConnected=true;
	connectCount++;
	console.log ('parking8');
});

parking9.on('connect', function() {
	isConnected=true;
	connectCount++;
	console.log ('parking9');
});

parking10.on('connect', function() {
	isConnected=true;
	connectCount++;
	console.log ('parking10');
});

//console.log(connectCount);
	
	state = {
		bayID : 0001,
		status : undefined,
		restriction_duration : undefined,
	}
	
		handleChanges = (event) =>
	{
		this.setState({
			bayID:event.target.value
		})
		
	}
	
	outputData = () => {
		console.log(this.state.data);
		return (this.state.data);
	}
	
	
	getParkingStatus = () => {
		fetch(`https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?bay_id=$1761`)		//hardcoded for testing
			.then(reponse => response.json())
			.then(data => {
				this.setState({
					data : data
				})
			})
	}
	
	getParkingStatus();
