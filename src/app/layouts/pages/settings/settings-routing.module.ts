import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SettingsComponent} from './settings.component';
import {SettingsModule} from './settings.module';

const routes: Routes = [
  {
    path: '', component: SettingsComponent
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), SettingsModule],
})
export class SettingsRoutingModule {
}



