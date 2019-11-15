import {SharedModule} from '../../../shared/shared.module';
import {NgModule} from '@angular/core';
import {StatisticsComponent} from './statistics.component';
import {WorkerComponent} from './components/worker/worker.component';
import {OwnerComponent} from './components/owner/owner.component';
import { OwnerProjectComponent } from './components/owner-project/owner-project.component';

@NgModule({
  declarations: [
    StatisticsComponent,
    WorkerComponent,
    OwnerComponent,
    OwnerProjectComponent
  ],
  imports: [
    SharedModule
  ]
})
export class StatisticsModule {
}

