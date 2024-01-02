import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHostComponent } from './admin-host/admin-host.component';
import { ClientHostComponent } from './client-host/client-host.component';
import { TestComponent } from './test/test.component';
import { RouterModule } from '@angular/router';
import { SimpleHostComponent } from './simple-host/simple-host.component';
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ValidationService } from './services/validation.service';
import { ButtonModule } from 'primeng/button';
import { ProjectService } from './services/project.service';
import { HttpClientModule } from '@angular/common/http';
import { BaseComponent } from './components/base/base.component';
import { RefreshTestComponent } from './components/refresh-test/refresh-test/refresh-test.component';
import { PlatformLocation } from '@angular/common';
import {APP_BASE_HREF} from "@angular/common";
@NgModule({
  declarations: [
    AppComponent,
    AdminHostComponent,
    ClientHostComponent,
    TestComponent,
    SimpleHostComponent,
    BaseComponent,
    RefreshTestComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ToastModule,
    BrowserAnimationsModule, 
    ButtonModule
  ],
  providers: [MessageService, ValidationService, ProjectService,
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation]
    }],
  bootstrap: [AppComponent],
})
export class AppModule { 
    
}
export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}