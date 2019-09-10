import {Component, ViewChild, ElementRef, OnInit, AfterViewInit} from '@angular/core';

import {SearchService} from '../../services';

import * as _ from 'underscore';
import * as googleMapStyles from '../../config/google-map-styles.js';

@Component({
	selector: 'results',
	templateUrl: './results.cmpt.html',
	styleUrls: ['./results.cmpt.scss'],
})

export class ResultsCmpt implements OnInit, AfterViewInit {
	@ViewChild('mapView', {
		static: false
	}) mapView: ElementRef;

	private map: google.maps.Map;
	private markers: any = {
		me: null,
		parks: [],
		location: null,
	};
	private infoWindow: google.maps.InfoWindow;
	private icons: any = {
		car: {
			scaledSize: new google.maps.Size(32, 32),
			url: '/assets/markers/car.svg',
		},
		park: {
			scaledSize: new google.maps.Size(32, 32),
			url: '/assets/markers/park.svg',
		},
		me: {
			scaledSize: new google.maps.Size(32, 32),
			url: '/assets/markers/me.svg',
		},
		pin: {
			scaledSize: new google.maps.Size(32, 32),
			url: '/assets/markers/pin.svg',
		},
	}

	constructor(private searchService: SearchService) {}

	ngOnInit() {
		this.searchService.subscribeToParams(params => {
			if (params.coords) {
				this.map.setCenter(params.coords);

				this.markers.pin.setPosition(params.coords);
			}
		});
	}

	ngAfterViewInit() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				var mePos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				
				this.map = new google.maps.Map(this.mapView.nativeElement, {
					center: mePos,
					styles: googleMapStyles,
					zoom: 14,
					streetViewControl: false,
				});

				this.markers.me = new google.maps.Marker({
					position: mePos,
					title: 'Your Current Position',
					map: this.map,
					icon: this.icons.me,
				});

				this.markers.pin = new google.maps.Marker({
					position: null,
					map: this.map,
					title: 'Searched Location',
					icon: this.icons.pin,
				});

				this.infoWindow = new google.maps.InfoWindow();

				this.markers.parks.push(new google.maps.Marker({
					map: this.map,
					icon: this.icons.park,
					position: {
						lat: -38.1851821,
						lng: 144.3153567,
					},
					title: 'Park 01',
				}));

				this.markers.parks[0].addListener('click', this.parkCallback());
			});

			navigator.geolocation.watchPosition(position => {
				this.markers.me.setPosition({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
		}
	}

	parkCallback() {
		var component = this;
		return function(event) {
			var marker = this;
			component.infoWindow.setContent(component.parkInfo(marker));
			component.infoWindow.setPosition(marker.getPosition());
			component.infoWindow.open(marker.map, marker);
			console.log(component);
			console.log(event);
		};
	}

	parkInfo(marker) {
		var html = '';

		html += `
			<style>
				#content {
					color: #000000;
				}

				.park-modal-header {

				}

				.park-modal-title {
					font-size:18px;
					font-weight:600;
				}

				.park-modal-address {
					font-size:14px;
					color:#999999;
					font-weight:500;
					margin-top:4px;
				}

				.park-modal-attributes {
					width:100%;
					border-collapse:collapse;
					margin-top:10px;
				}

				.park-modal-attributes td, .park-modal-attributes th {
					padding:10px;
					text-align:left;
					border:1px solid #F5F5F5;
				}

				.park-modal-attributes tr:nth-child(even) {
					background-color:#F5F5F5;
				}
			</style>
			<div id="content">
				<div class="park-modal-header">
					<div class="park-modal-title">Bay ID: 6181</div>
					<div class="park-modal-address">101 Parking Lane, Melbourne VIC 3000</div>
				</div>
				<div class="park-modal-body">
					<table class="park-modal-attributes">
						<tbody>
							<tr>
								<th>Rate</th>
								<td>$500 per hour</td>
							</tr>
							<tr>
								<th>Restrictions</th>
								<td>Disabled Only</td>
							</tr>
							<tr>
								<th>Status</th>
								<td>Unoccupied</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		`;

		return html;
	}
}