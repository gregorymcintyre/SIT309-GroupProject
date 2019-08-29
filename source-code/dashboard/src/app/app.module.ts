import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Importing Material Components
import {MaterialModule} from './modules/material.module';

import {AppCmpt} from './app.cmpt';
import {HeaderCmpt, SearchCmpt} from './components';

import {SearchService, GooglePlacesService} from './services';

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
		HttpClientJsonpModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		FlexLayoutModule,
		HttpClientModule,
	],
	exports: [
		MaterialModule
	],
	providers: [
		SearchService,
		GooglePlacesService
	],
	bootstrap: [AppCmpt]
})
export class AppModule {}
