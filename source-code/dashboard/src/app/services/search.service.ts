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

	constructor() {
		
	}

	getLocation() {

	}

	setParams(params: SearchParams) {
		console.log(params);
		this.params = _.extend(this.params, params);
		this.paramsSubject.next(this.params);
	}

	getParams() {
		return this.params;
	}

	subscribeToParams(handler) {
		this.paramsObservable.subscribe(handler);
	}
}