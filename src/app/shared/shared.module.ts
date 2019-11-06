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
import {DatetimepickerComponent} from '../layouts/components/datetimepicker/datetimepicker.component';
import {ChartComponent} from '../layouts/components/chart/chart.component';
import {ChartsModule} from 'ng2-charts';
import {SocketService} from './services/socket.service';

@NgModule({
  declarations: [
    HeaderComponent,
    DatetimepickerComponent,
    ChartComponent,
    PageComponent],
  exports: [
    HeaderComponent, PageComponent, ReactiveFormsModule, CommonModule,
    RouterModule, FormsModule, DatetimepickerComponent,
    ChartComponent, ChartsModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
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
