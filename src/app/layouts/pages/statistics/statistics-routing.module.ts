import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StatisticsModule} from './statistics.module';
import {StatisticsComponent} from './statistics.component';

const routes: Routes = [
  {
    path: '', component: StatisticsComponent
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), StatisticsModule],
})
export class StatisticsRoutingModule {
}



