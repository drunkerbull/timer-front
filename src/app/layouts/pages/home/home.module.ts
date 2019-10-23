import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {SharedModule} from '../../../shared/shared.module';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, LoginComponent, RegisterComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {
}
