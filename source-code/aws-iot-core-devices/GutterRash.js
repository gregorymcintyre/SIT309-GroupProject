const awsIot = require('aws-iot-device-sdk');
const fetch = require("node-fetch");

var bay1 = 951;
var bay2 = 6919;
var bay3 = 6920;
var bay4 = 4712;
var bay5 = 4725;
var bay6 = 4735;
var bay7 = 4739;
var bay8 = 4745;
var bay9 = 4750;
var bay10 = 6834;

const parking1 = awsIot.device({
	certPath:	'./certificates/parking1/4c54dfc22e-certificate.pem.crt',
	keyPath:	'./certificates/parking1/4c54dfc22e-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'parking2',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking2 = awsIot.device({
	certPath:	'./certificates/parking2/a6b4294fb4-certificate.pem.crt',
	keyPath:	'./certificates/parking2/a6b4294fb4-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'parking2',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking3 = awsIot.device({
	certPath:	'./certificates/parking3/2554f696ef-certificate.pem.crt',
	keyPath:	'./certificates/parking3/2554f696ef-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'parking3',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking4 = awsIot.device({
	certPath:	'./certificates/parking4/21e85a4a82-certificate.pem.crt',
	keyPath:	'./certificates/parking4/21e85a4a82-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'parking4',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking5 = awsIot.device({
	certPath:	'./certificates/parking5/e1227c5cce-certificate.pem.crt',
	keyPath:	'./certificates/parking5/e1227c5cce-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'parking5',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking6 = awsIot.device({
	certPath:	'./certificates/parking6/a450ae3190-certificate.pem.crt',
	keyPath:	'./certificates/parking6/a450ae3190-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'parking6',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking7 = awsIot.device({
	certPath:	'./certificates/parking7/bbb6f3aded-certificate.pem.crt',
	keyPath:	'./certificates/parking7/bbb6f3aded-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'parking7',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking8 = awsIot.device({
	certPath:	'./certificates/parking8/02a7125063-certificate.pem.crt',
	keyPath:	'./certificates/parking8/02a7125063-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'parking8',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});
const parking9 = awsIot.device({
	certPath:	'./certificates/parking9/a7b98e4de2-certificate.pem.crt',
	keyPath:	'./certificates/parking9/a7b98e4de2-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'parking9',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});
const parking10 = awsIot.device({
	certPath:	'./certificates/parking10/975dc8e754-certificate.pem.crt',
	keyPath:	'./certificates/parking10/975dc8e754-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'parking10',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

const parking11 = awsIot.device({
	certPath:	'./certificates/parking11/51e2e1c5c1-certificate.pem.crt',
	keyPath:	'./certificates/parking11/51e2e1c5c1-private.pem.key',
	caPath:		'./certificates/rootCA.crt',
	clientId:	'parking11',
	host:		'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com'
});

//console.log('Conected to: '); 

var connectCount = 0;	//to simplify connections in the future

parking1.on('connect', function() {
	isConnectedParking1=true;
	connectCount++;
	console.log ('parking1 connected');
	//console.log(connectCount + ' of 10 devices connected');
		
		//parking1.publish('parking1', '{"data" : "test"}');
		//console.log ('parking1 message published');
});

parking2.on('connect', function() {
	//parking2.on('error', (msg) => { console.log('error: ' + msg); });
	
	isConnectedparking2=true;
	connectCount++;
	console.log ('parking2 connected');
	//console.log(connectCount + ' of 10 devices connected');
		
		//parking2.publish('parking2', '{"data" : "test"}');
		//console.log ('parking2 message published');
});

parking3.on('connect', function() {
	isConnectedparking3=true;
	connectCount++;
	console.log ('parking3 connected');
	//console.log(connectCount + ' of 10 devices connected');
	
		//parking3.publish('parking3', '{"data" : "test"}');
		//console.log ('parking3 message published');
	
});

parking4.on('connect', function() {
	isConnectedparking4=true;
	connectCount++;
	console.log ('parking4 connected');
	//console.log(connectCount + ' of 10 devices connected');
});

parking5.on('connect', function() {
	isConnectedparking5=true;
	connectCount++;
	console.log ('parking5 connected');
	//console.log(connectCount + ' of 10 devices connected');
});

parking6.on('connect', function() {
	isConnectedparking6=true;
	connectCount++;
	console.log ('parking6 connected');
	//console.log(connectCount + ' of 10 devices connected');
});

parking7.on('connect', function() {
	isConnectedparking7=true;
	connectCount++;
	console.log ('parking7 connected');
	//console.log(connectCount + ' of 10 devices connected');
});

parking8.on('connect', function() {
	isConnectedparking8=true;
	connectCount++;
	console.log ('parking8 connected');
	//console.log(connectCount + ' of 10 devices connected');
});

parking9.on('connect', function() {
	isConnectedparking9=true;
	connectCount++;
	console.log ('parking9 connected');
	//console.log(connectCount + ' of 10 devices connected');
});

parking10.on('connect', function() {
	isConnectedparking10=true;
	connectCount++;
	console.log ('parking10 connected');
	//console.log(connectCount + ' of 10 devices connected');
});

 //store is device is connected or not 
let isConnectedparking1=false; 
let isConnectedparking2=false; 
let isConnectedparking3=false; 
let isConnectedparking4=false; 
let isConnectedparking5=false; 
let isConnectedparking6=false; 
let isConnectedparking7=false; 
let isConnectedparking8=false; 
let isConnectedparking9=false; 
let isConnectedparking10=false; 

//store a reference carSimulation method callback 
let timeout=null; 

//console.log(connectCount);

	/*	
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
	
	//getParkingStatus();
	*/
	
	function publishData (bay1, bay2, bay3, bay4, bay5, bay6, bay7, bay8, bay9, bay10) {
		
		console.log('Publish initiated');
		
		try{
			parking1.publish('parking1', '{"bayID": ' + bay1 + ', "status": "Unoccupied", "restriction_duration": 30 }');
			console.log ('parking1 message published');
		}catch(err){
			console.log('Parking 1: ' + err.name);
		}

		try{
			parking2.publish('parking2', '{"bayID": ' + bay2 + ', "status": "Unoccupied", "restriction_duration": 30 }');
			console.log ('parking2 message published');
		}catch(err){
			console.log('Parking 2: ' + err.name);
		}

		try{
			parking3.publish('parking3', '{"bayID": ' + bay3 + ', "status": "Unoccupied", "restriction_duration": 30 }');
			console.log ('parking3 message published');
		}catch(err){
			console.log('Parking 3: ' + err.name);
		}
		
		try{
			parking4.publish('parking4', '{"bayID": ' + bay4 + ', "status": "Unoccupied", "restriction_duration": 30 }');
			console.log ('parking4 message published');
		}catch(err){
			console.log('Parking 4: ' + err.name);
		}
		
		try{
			parking5.publish('parking5', '{"bayID": ' + bay5 + ', "status": "Unoccupied", "restriction_duration": 30 }');
			console.log ('parking5 message published');
		}catch(err){
			console.log('Parking 5: ' + err.name);
		}
		
		try{
			parking6.publish('parking6', '{"bayID": ' + bay6 + ', "status": "Unoccupied", "restriction_duration": 30 }');
			console.log ('parking6 message published');
		}catch(err){
			console.log('Parking 6: ' + err.name);
		}
		
		try{
			parking7.publish('parking7', '{"bayID": ' + bay7 + ', "status": "Unoccupied", "restriction_duration": 30 }');
			console.log ('parking7 message published');
		}catch(err){
			console.log('Parking 7: ' + err.name);
		}
		
		try{
			parking8.publish('parking8', '{"bayID": ' + bay8 + ', "status": "Unoccupied", "restriction_duration": 30 }');
			console.log ('parking8 message published');
		}catch(err){
			console.log('Parking 8: ' + err.name);
		}
		
		try{
			parking9.publish('parking9', '{"bayID": ' + bay9 + ', "status": "Unoccupied", "restriction_duration": 30 }');
			console.log ('parking3 message published');
		}catch(err){
			console.log('Parking 9: ' + err.name);
		}
		
		try{
			parking10.publish('parking10', '{"bayID": ' + bay10 + ', "status": "Unoccupied", "restriction_duration": 30 }');
			console.log ('parking3 message published');
		}catch(err){
			console.log('Parking 10: ' + err.name);
		}
		
	}

	function queryBays(bay1, bay2, bay3, bay4, bay5, bay6, bay7, bay8, bay9, bay10){
		console.log('Bay queries intiaited');

		console.log('querying Bay ID ' + bay1);
		fetch('https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?bay_id=951')		//hardcoded for testing
			.then(res => res.json())
			.then(json => console.log(json));
		
		console.log('querying Bay ID ' + bay2);
		fetch('https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?bay_id=6919')		//hardcoded for testing
			.then(res => res.json())
			.then(json => console.log(json));
			
		console.log('querying Bay ID ' + bay3);
		fetch('https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?bay_id=6920')		//hardcoded for testing
			.then(res => res.json())
			.then(json => console.log(json));
			
		console.log('querying Bay ID ' + bay4);
		fetch('https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?bay_id=4712')		//hardcoded for testing
			.then(res => res.json())
			.then(json => console.log(json));
			
		console.log('querying Bay ID ' + bay5);
		fetch('https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?bay_id=4735')		//hardcoded for testing
			.then(res => res.json())
			.then(json => console.log(json));
			
		console.log('querying Bay ID ' + bay6);
		fetch('https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?bay_id=4745')		//hardcoded for testing
			.then(res => res.json())
			.then(json => console.log(json));
			
		console.log('querying Bay ID ' + bay7);
		fetch('https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?bay_id=4746')		//hardcoded for testing
			.then(res => res.json())
			.then(json => console.log(json));
			
		console.log('querying Bay ID ' + bay8);
		fetch('https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?bay_id=4748')		//hardcoded for testing
			.then(res => res.json())
			.then(json => console.log(json));
			
		console.log('querying Bay ID ' + bay9);
		fetch('https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?bay_id=6834')		//hardcoded for testing
			.then(res => res.json())
			.then(json => console.log(json));
			
		console.log('querying Bay ID ' + bay10);
		fetch('https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?bay_id=6835')		//hardcoded for testing
			.then(res => res.json())
			.then(json => console.log(json));
			
	}
	
	
	setInterval(
		function(){
			//console.log('timer test');
			//if (connectCount >= 3){
				queryBays(bay1, bay2, bay3, bay4, bay5, bay6, bay7, bay8, bay9, bay10);
				//publishData(bay1, bay2, bay3, bay4, bay5, bay6, bay7, bay8, bay9, bay10);
				//connectCount = 0;
			//}
		}, 10000		//10 seconds (testing)
		//}, 120000		//2 Minutes
	);
	
	
	
	
	
	
	
	
	
	
	
	
	