import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BaseHttpService} from './services/base-http.service';
import {StorageService} from './services/storage.service';
import {HeaderComponent} from '../layouts/components/header/header.component';
import {ErrorHandlingService} from './services/error-handling.service';
import {PageComponent} from '../layouts/components/page/page.component';
import {APIInterceptor} from './services/APIInterceptor.service';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HeaderComponent,
    PageComponent],
  exports: [
    HeaderComponent, PageComponent, ReactiveFormsModule, CommonModule,
    RouterModule,  OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    },
    BaseHttpService,
    ErrorHandlingService,
    StorageService
  ]
})
export class SharedModule {
}
