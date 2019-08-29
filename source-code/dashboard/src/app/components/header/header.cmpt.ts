import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'header',
	templateUrl: './header.cmpt.html',
	styleUrls: ['./header.cmpt.scss'],
	import: [Router],
})

export class HeaderCmpt implements OnInit {
	menuItems = [
		{
			endpoint: 'dashboard',
			name: 'Dashboard',
		},
		{
			endpoint: 'iot-activity',
			name: 'IoT Activity',
		},
	];

	constructor (public router: Router) {
		
	}

	ngOnInit() {
		
	}

	onEndpoint(endpoint: string) {
		var url = this.router.url.split('/');

		return url[1] == endpoint;
	}
}