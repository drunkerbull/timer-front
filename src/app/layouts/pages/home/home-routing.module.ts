import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {HomeModule} from './home.module';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), HomeModule],
})
export class HomeRoutingModule {
}



