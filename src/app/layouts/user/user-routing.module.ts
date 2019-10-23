import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UserComponent} from './user.component';
import {UserModule} from './user.module';
import {MessagesComponent} from './pages/messages/messages.component';
import {ProjectsComponent} from './pages/projects/projects.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {StatisticsComponent} from './pages/statistics/statistics.component';

const routes: Routes = [
  {
    path: '', component: UserComponent
  },
  {
    path: 'messages', component: MessagesComponent
  },
  {
    path: 'projects', component: ProjectsComponent
  },
  {
    path: 'settings', component: SettingsComponent
  },
  {
    path: 'statistics', component: StatisticsComponent
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), UserModule],
})
export class UserRoutingModule {
}



