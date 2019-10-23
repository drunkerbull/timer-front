import {NgModule} from '@angular/core';
import {UserComponent} from './user.component';
import {SharedModule} from '../../shared/shared.module';
import {MessagesComponent} from './pages/messages/messages.component';
import {ProjectsComponent} from './pages/projects/projects.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {StatisticsComponent} from './pages/statistics/statistics.component';

@NgModule({
  declarations: [
    UserComponent, MessagesComponent, ProjectsComponent, SettingsComponent, StatisticsComponent
  ],
  imports: [
    SharedModule
  ]
})
export class UserModule {
}
