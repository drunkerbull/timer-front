import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {MessagesComponent} from './messages.component';

@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    SharedModule
  ]
})
export class MessagesModule {
}