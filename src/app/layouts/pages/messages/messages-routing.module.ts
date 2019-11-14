import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MessagesModule} from './messages.module';
import {MessagesComponent} from './messages.component';
import {MessagesResolve} from '../../../shared/resolvers/messages.resolve';

const routes: Routes = [
  {
    path: '', component: MessagesComponent
  },
  {
    path: ':room', component: MessagesComponent, resolve: {room: MessagesResolve}
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), MessagesModule],
})
export class MessagesRoutingModule {
}



