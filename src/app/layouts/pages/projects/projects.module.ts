import {ProjectsComponent} from './projects.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ProjectComponent } from './pages/project/project.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule
  ]
})
export class ProjectsModule {
}
