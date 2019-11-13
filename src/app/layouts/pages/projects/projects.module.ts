import {ProjectsComponent} from './projects.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgModule} from '@angular/core';
import {ProjectComponent} from './pages/project/project.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class ProjectsModule {
}
