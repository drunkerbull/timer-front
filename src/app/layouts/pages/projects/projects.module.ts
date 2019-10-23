import {ProjectsComponent} from './projects.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ProjectsModule {
}
