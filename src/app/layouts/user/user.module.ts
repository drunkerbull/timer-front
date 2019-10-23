import {NgModule} from '@angular/core';
import {UserComponent} from './user.component';
import {SharedModule} from '../../shared/shared.module';
import {AppModule} from '../../app.module';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    SharedModule,
    AppModule
  ]
})
export class UserModule {
}
