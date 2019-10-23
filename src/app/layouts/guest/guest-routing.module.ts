import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GuestComponent} from './guest.component';
import {GuestModule} from './guest.module';

const routes: Routes = [
  {
    path: '', component: GuestComponent
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), GuestModule],
})
export class GuestRoutingModule {
}



