import {Component, OnInit} from '@angular/core';

import {SearchService} from './../../services';

@Component({
	selector: 'search',
	templateUrl: './search.cmpt.html',
})

export class SearchCmpt implements OnInit {
	constructor (private searchService: SearchService) {}

	ngOnInit() {

	}

	search(event) {
		this.searchService.setParams({
			query: event.target.value,
		});
	}
}