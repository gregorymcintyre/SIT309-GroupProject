import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Importing Material Components
import {MaterialModule} from './modules/material.module';

import {AppCmpt} from './app.cmpt';
import {HeaderCmpt, SearchCmpt} from './components';

import {SearchService} from './services';

import {DashboardPage, NotFoundPage, ActivityPage} from './pages';

@NgModule({
	declarations: [
		AppCmpt,
		HeaderCmpt,
		SearchCmpt,
		DashboardPage,
		NotFoundPage,
		ActivityPage,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
	],
	exports: [
		MaterialModule
	],
	providers: [
		SearchService
	],
	bootstrap: [AppCmpt]
})
export class AppModule {}
