import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MessagesModule} from './messages.module';
import {MessagesComponent} from './messages.component';

const routes: Routes = [
  {
    path: '', component: MessagesComponent
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), MessagesModule],
})
export class MessagesRoutingModule {
}



