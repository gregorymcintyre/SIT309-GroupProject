import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Importing Material Components
import {MaterialModule} from './modules/material.module';

import {AppCmpt} from './app.cmpt';
import {HeaderCmpt} from './components';

import {DashboardPage, NotFoundPage} from './pages';

@NgModule({
	declarations: [
		AppCmpt,
		HeaderCmpt,
		DashboardPage,
		NotFoundPage,
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
	providers: [],
	bootstrap: [AppCmpt]
})
export class AppModule {}
