import {Component} from '@angular/core';

@Component({
	templateUrl: './activity.cmpt.html',
	styleUrls: ['./activity.cmpt.scss'],
})

export class ActivityPage {
	activityDataSource = [];
	activityColumns: string[] = ['position', 'name', 'weight', 'symbol'];
}