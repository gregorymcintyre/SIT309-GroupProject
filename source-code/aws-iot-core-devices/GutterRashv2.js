const awsIot = require('aws-iot-device-sdk');
const fetch = require("node-fetch");
const _ = require('underscore');

//modify bay variables here
//var bay1 = 951;
const awsHost = 'a3e9smmo06mnl8-ats.iot.us-east-1.amazonaws.com';
const caPath = './certificates/rootCA.crt';
var parkingBays = [];
var initialBayIds = [
	951: {
		slug: 'parking1',
		certPath:	'./certificates/parking1/4c54dfc22e-certificate.pem.crt',
		keyPath:	'./certificates/parking1/4c54dfc22e-private.pem.key',
	},
	6919: {
		slug: 'parking2',
		certPath:	'./certificates/parking2/a6b4294fb4-certificate.pem.crt',
		keyPath:	'./certificates/parking2/a6b4294fb4-private.pem.key',
	},
	6920: {
		slug: 'parking3',
		certPath:	'./certificates/parking3/2554f696ef-certificate.pem.crt',
		keyPath:	'./certificates/parking3/2554f696ef-private.pem.key',
	},
	4712: {
		slug: 'parking4',
		certPath:	'./certificates/parking4/21e85a4a82-certificate.pem.crt',
		keyPath:	'./certificates/parking4/21e85a4a82-private.pem.key',
	},
	4725: {
		slug: 'parking5',
		certPath:	'./certificates/parking5/e1227c5cce-certificate.pem.crt',
		keyPath:	'./certificates/parking5/e1227c5cce-private.pem.key',
	},
	4735: {
		slug: 'parking6',
		certPath:	'./certificates/parking6/a450ae3190-certificate.pem.crt',
		keyPath:	'./certificates/parking6/a450ae3190-private.pem.key',
	},
	4739: {
		slug: 'parking7',
		certPath:	'./certificates/parking7/bbb6f3aded-certificate.pem.crt',
		keyPath:	'./certificates/parking7/bbb6f3aded-private.pem.key',
	},
	4745: {
		slug: 'parking8',
		certPath:	'./certificates/parking8/02a7125063-certificate.pem.crt',
		keyPath:	'./certificates/parking8/02a7125063-private.pem.key',
	},
	4750: {
		slug: 'parking9',
		certPath:	'./certificates/parking9/a7b98e4de2-certificate.pem.crt',
		keyPath:	'./certificates/parking9/a7b98e4de2-private.pem.key',
	},
	6834: {
		slug: 'parking10',
		certPath:	'./certificates/parking10/975dc8e754-certificate.pem.crt',
		keyPath:	'./certificates/parking10/975dc8e754-private.pem.key',
	}
];

_.each(initialBayIds, (info, bayId) => {

	var bay = {
		bayId: bayId,
		slug: info.slug,
		device: awsIot.device({
			certPath: info.certPath,
			keyPath: info.keyPath
			caPath: caPath,
			clientId: 'parking' + (parkingBays.length + 1),
			host: awsHost,
		}),
		data: {
			bayID: bayId,
			status: undefined,
			restriction_duration: undefined,
		},
		connected: false,
	};

	bay.device.on('connect', () => {
		bay.connected = true;
	});

	parkingBays.push(bay);
});

function publishData(bayId, data) {
	var bay = _.findWhere(parkingBays, {
		bayId: bayId,
	});

	try {
		bay.device.publish(bay.slug, JSON.stringify(data));
		console.log(`${bay.slug} message published`);
	} catch(err) {
		console.log(`${bay.slug}: ` + err.name);
	}
}

function queryBay(bayId, handler) {
	var bay = _.findWhere(parkingBays, {
		bayId: bayId,
	});

	fetch('https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?bay_id=' + bayId)
		.then(res => res.json())
		.then( json => {
			bay.data.status = json[0].status;
			bay.data.restriction_duration = 30;

			console.log(bay.data.bayID + " : " + bay.data.status + " : " + bay.data.restriction_duration);
			handler(bay);
		});
}


setInterval(() => {
	_.each(parkingBays, bay => {
		queryBay(bay.bayId, bay => {
			publishData(bay.bayId, bay.data);
		});
	});
}, 10000);