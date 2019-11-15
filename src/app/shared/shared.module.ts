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
import {LoaderComponent} from '../layouts/components/loader/loader.component';
import {CropperComponent} from '../layouts/components/cropper/cropper.component';
import {DropComponent} from '../layouts/components/drop/drop.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {TimerComponent} from '../layouts/components/header/components/timer/timer.component';
import {TabsetComponent} from '../layouts/components/tabset/tabset.component';
import {TabComponent} from '../layouts/components/tabset/components/tab/tab.component';

@NgModule({
  declarations: [
    HeaderComponent, DatetimepickerComponent, ChartComponent,
    LoaderComponent, CropperComponent, PageComponent,
    DropComponent, TimerComponent, TabsetComponent, TabComponent
  ],
  exports: [
    HeaderComponent, PageComponent, ReactiveFormsModule, CommonModule,
    RouterModule, FormsModule, DatetimepickerComponent,
    ChartComponent, ChartsModule, LoaderComponent, CropperComponent,
    DropComponent, AngularSvgIconModule, TimerComponent, TabsetComponent, TabComponent
  ],
  imports: [
    CommonModule, FormsModule, RouterModule,
    HttpClientModule, ReactiveFormsModule, ChartsModule,
    AngularSvgIconModule
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
