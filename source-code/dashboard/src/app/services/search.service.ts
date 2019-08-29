import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {SearchParams} from './../interfaces';

import * as _ from 'underscore';

@Injectable({
	providedIn: 'root',
})

export class SearchService {
	private params: SearchParams = {};
	private paramsSubject = new BehaviorSubject<SearchParams>({});
	private paramsObservable = this.paramsSubject.asObservable();
	private placesService: google.maps.places.PlacesService;

	constructor() {
		var map = new google.maps.Map(document.createElement('div'));
		this.placesService = new google.maps.places.PlacesService(map);
	}

	getLocation() {

	}

	setParams(params: SearchParams) {
		this.params = _.extend(this.params, params);

		if (this.params.coords == null && this.params.placeId) {
			this.placesService.getDetails({
				placeId: this.params.placeId,
				fields: ['geometry'],
			}, response => {
				this.params.coords = response.geometry.location;
				this.paramsSubject.next(this.params);
			});
		} else {
			this.paramsSubject.next(this.params);
		}

	}

	getParams() {
		return this.params;
	}

	subscribeToParams(handler) {
		this.paramsObservable.subscribe(handler);
	}
}