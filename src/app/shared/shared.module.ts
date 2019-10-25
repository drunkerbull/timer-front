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
import {OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';

export const owlMomentFormat = {
  parseInput: 'l LT',
  fullPickerInput: 'DD-MM-YYYY HH:mm:ss',
  datePickerInput: 'DD-MM-YYYY',
  timePickerInput: 'HH:mm:ss',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
  declarations: [
    HeaderComponent,
    PageComponent],
  exports: [
    HeaderComponent, PageComponent, ReactiveFormsModule, CommonModule,
    RouterModule, OwlDateTimeModule,
    OwlNativeDateTimeModule, FormsModule, OwlMomentDateTimeModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OwlMomentDateTimeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    },
    {provide: OWL_DATE_TIME_FORMATS, useValue: owlMomentFormat},
    BaseHttpService,
    ErrorHandlingService,
    StorageService
  ]
})
export class SharedModule {
}
