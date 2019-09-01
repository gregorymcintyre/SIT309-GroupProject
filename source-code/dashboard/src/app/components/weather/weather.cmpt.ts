import {Component, OnInit} from '@angular/core';
import {} from 'googlemaps';

import {SearchService, WeatherService} from './../../services';
import {SearchParams} from './../../interfaces';

@Component({
	selector: 'weather',
	templateUrl: './weather.cmpt.html',
	styleUrls: ['./weather.cmpt.scss'],
})

export class WeatherCmpt implements OnInit {
	public searchParams: SearchParams;

	constructor (private searchService: SearchService, private weatherService: WeatherService) {}

	ngOnInit() {
		this.searchService.subscribeToParams(params => {
			this.searchParams = params;

			// Get weather
			if (params.coords != null) {
				this.weatherService.getCurrentWeather(params.coords.lat, params.coords.lng);
			}
		});
	}
}