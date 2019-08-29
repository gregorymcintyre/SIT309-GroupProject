import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class GooglePlacesService {
	private googleApiKey = 'AIzaSyD3SvxWWG84cxXh7DhGJEQLgWyzzAZi0ZY';

	constructor (private http: HttpClient) {}

	getAutocompleteSuggestions(query: string, handler: any) {
		var serialisedQuery = encodeURIComponent(query);
		this.http.get(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${serialisedQuery}&key=${this.googleApiKey}&inputtype=textquery`).subscribe(data => {
			console.log(data);
		});
	}
}