import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProjectsModule} from './projects.module';
import {ProjectsComponent} from './projects.component';
import {ProjectComponent} from './pages/project/project.component';
import {ProjectResolve} from '../../../shared/resolvers/project.resolve';

const routes: Routes = [
  {
    path: '', component: ProjectsComponent
  },
  {
    path: ':project', component: ProjectComponent, resolve: {project: ProjectResolve}
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), ProjectsModule],
})
export class ProjectsRoutingModule {
}



