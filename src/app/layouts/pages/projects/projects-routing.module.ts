import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProjectsModule} from './projects.module';
import {ProjectsComponent} from './projects.component';

const routes: Routes = [
  {
    path: '', component: ProjectsComponent
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), ProjectsModule],
})
export class ProjectsRoutingModule {
}



