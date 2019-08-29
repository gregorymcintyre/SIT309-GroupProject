import {Component, OnInit} from '@angular/core';
import {trigger, state, animate, transition, style, group} from '@angular/animations';
import {} from 'googlemaps';


import {SearchService} from './../../services';

@Component({
	selector: 'search',
	templateUrl: './search.cmpt.html',
	styleUrls: ['./search.cmpt.scss'],
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
	public selectedPrediction: google.maps.places.QueryAutocompletePrediction;
	public placeSuggestions: google.maps.places.QueryAutocompletePrediction[] = [];
	public showAdvancedSearch: boolean = true;

	autocompleteService: google.maps.places.AutocompleteService;

	constructor (private searchService: SearchService) {
		this.autocompleteService = new google.maps.places.AutocompleteService();
	}

	ngOnInit() {

	}

	updateSuggestions(field) {
		if (field.value.length > 3) {
			this.autocompleteService.getQueryPredictions({
				input: field.value,
			}, response => {
				this.placeSuggestions = response;
			});
		}
	}

	selectPrediction(event) {
		console.log(event);
		this.selectedPrediction = event.option.value as google.maps.places.QueryAutocompletePrediction;
	}

	displayPrediction(prediction) {
		return prediction.description;
	}

	updateQuery() {
		this.searchService.setParams({
			query: this.selectedPrediction.description,
			coords: null,
			placeId: this.selectedPrediction.place_id,
		});
	}
}