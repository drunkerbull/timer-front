import {ProjectsComponent} from './projects.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgModule} from '@angular/core';
import {ProjectComponent} from './pages/project/project.component';
import { TaskComponent } from './pages/project/components/task/task.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectComponent,
    TaskComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class ProjectsModule {
}
