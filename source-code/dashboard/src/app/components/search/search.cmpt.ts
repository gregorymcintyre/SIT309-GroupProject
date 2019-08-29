import {Component, OnInit} from '@angular/core';
import {trigger, state, animate, transition, style, group} from '@angular/animations';

import {SearchService, GooglePlacesService} from './../../services';

@Component({
	selector: 'search',
	templateUrl: './search.cmpt.html',
	animations: [
		trigger('toggleState', [
            state('in', style({height: '*', opacity: 0})),
            transition(':leave', [
                style({height: '*', opacity: 1}),

                group([
                    animate(300, style({height: 0})),
                    animate('200ms ease-in-out', style({'opacity': '0'}))
                ])

            ]),
            transition(':enter', [
                style({height: '0', opacity: 0}),

                group([
                    animate(300, style({height: '*'})),
                    animate('400ms ease-in-out', style({'opacity': '1'}))
                ])

            ])
        ])
	]
})

export class SearchCmpt implements OnInit {
	showAdvancedSearch: boolean = false;
	options = ['test', 'hello'];
	placeSuggestions: any = [];

	constructor (private searchService: SearchService, private googlePlacesService: GooglePlacesService) {}

	ngOnInit() {

	}

	updateSuggestions(field) {
		if (field.value.length > 3) {
			this.googlePlacesService.getAutocompleteSuggestions(field.value, response => {
				this.placeSuggestions = response.predictions;
			});
		}
	}
}