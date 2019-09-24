import {Component, OnInit} from '@angular/core';
import {} from 'googlemaps';
import * as _ from 'underscore';

import {SearchService, WeatherService} from './../../services';
import {SearchParams} from './../../interfaces';

@Component({
	selector: 'weather',
	templateUrl: './weather.cmpt.html',
	styleUrls: ['./weather.cmpt.scss'],
})

export class WeatherCmpt implements OnInit {
	public searchParams: SearchParams;
	public currentWeather: any = null;

	constructor (private searchService: SearchService, private weatherService: WeatherService) {}

	ngOnInit() {
		this.searchService.subscribeToParams(params => {
			this.searchParams = params;

			if (_.empty(this.searchParams)) {
				this.currentWeather = null;
			}

			// Get weather
			if (params.coords != null) {
				this.weatherService.getCurrentWeather(params.coords.lat(), params.coords.lng(), response => {
					this.currentWeather = response;
				});
			}
		});
	}
}