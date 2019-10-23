import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UserComponent} from './user.component';
import {UserModule} from './user.module';

const routes: Routes = [
  {
    path: '', component: UserComponent
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), UserModule],
})
export class UserRoutingModule {
}



