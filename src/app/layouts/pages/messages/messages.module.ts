import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {MessagesComponent} from './messages.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MessagesBoxComponent} from './components/messages-box/messages-box.component';

@NgModule({
  declarations: [
    MessagesComponent,
    SidebarComponent,
    MessagesBoxComponent
  ],
  imports: [
    SharedModule
  ]
})
export class MessagesModule {
}
