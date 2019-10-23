import {SharedModule} from '../../../shared/shared.module';
import {NgModule} from '@angular/core';
import {SettingsComponent} from './settings.component';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SettingsModule {
}
